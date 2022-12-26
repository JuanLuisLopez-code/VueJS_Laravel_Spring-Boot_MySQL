package com.springboot.springboot.controllers;


import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.springboot.springboot.model.BlacklistToken;
import com.springboot.springboot.model.User;
import com.springboot.springboot.model.UserAndToken;
import com.springboot.springboot.repository.BlacklistTokenRepository;
import com.springboot.springboot.repository.MesaRepository;
import com.springboot.springboot.repository.ReservationRepository;
import com.springboot.springboot.repository.UserRepository;
import com.springboot.springboot.security.jwt.JwtUtils;
import com.springboot.springboot.security.jwt.AuthTokenFilter;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import com.springboot.springboot.model.Mesa;
import com.springboot.springboot.model.Reservation;

@CrossOrigin(origins = "http://localhost:5001")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository UserRepository;

    @Autowired
    private BlacklistTokenRepository BlacklistTokenRepository;

    @Autowired
    private AuthTokenFilter authTokenFilter;
    
    @Autowired
    private MesaRepository MesaRepository;

    @Autowired
    private ReservationRepository ReservationRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/profile")
    public ResponseEntity<User> profile() {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            User user = UserRepository.findByUsername(userDetails.getUsername()).get();
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println(e);
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/listReservation")
    public ResponseEntity<List<Mesa>> listReservation() {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            User user = UserRepository.findByUsername(userDetails.getUsername()).get();

            if (user == null) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            List<Mesa> mesas = new ArrayList<Mesa>();
            MesaRepository.showUserReservation(user.getId()).forEach(mesas::add);
            ;
            return new ResponseEntity<>(mesas, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/listReservation/{mesa_id}")
    public ResponseEntity<List<Reservation>> getReservationsOfMesa(@PathVariable(required = true) Long mesa_id) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            User user = UserRepository.findByUsername(userDetails.getUsername()).get();

            if (user == null) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            List<Reservation> mesas = new ArrayList<Reservation>();
            ReservationRepository.showReservationsOfMesa(user.getId(), mesa_id).forEach(mesas::add);
            return new ResponseEntity<>(mesas, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }// get one

    @PostMapping("/login")
    public ResponseEntity<UserAndToken> loginUser(@RequestBody User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            User user_ = UserRepository.findByUsername(user.getUsername()).get();
            UserAndToken userToken = new UserAndToken(jwt, user_);

            return new ResponseEntity<>(userToken, HttpStatus.OK);

        } catch (Exception e) {
            System.err.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        try {

            if (UserRepository.existsByUsername(user.getUsername()) > 0) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            } else if (UserRepository.existsByUsername(user.getEmail()) > 0) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            } else {
                user.setType("client");
                user.setIs_active(true);
                user.setPassword(encoder.encode(user.getPassword()));
                UserRepository.save(user);
                return new ResponseEntity<>(HttpStatus.CREATED);
            }
        } catch (Exception e) {
            System.err.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request) {
        try {
            String token = authTokenFilter.parseJwt(request);
            if (BlacklistTokenRepository.TokenExist(token) == 0) {
                BlacklistToken blacklistToken = new BlacklistToken();
                blacklistToken.setToken(token);
                BlacklistTokenRepository.save(blacklistToken);
            }
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
            System.err.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
