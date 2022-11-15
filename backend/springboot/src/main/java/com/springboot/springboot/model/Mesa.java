package com.springboot.springboot.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
@Entity
@Table(name = "mesas")
public class Mesa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name_mesa")
    private String name_mesa;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "is_active")
    private Boolean is_active;

    @Column(name = "photo")
    private String photo;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(name = "mesas_categories", joinColumns = { @JoinColumn(name = "mesa_id") }, inverseJoinColumns = {
            @JoinColumn(name = "category_id") })
    private Set<Category> categories = new HashSet<>();

    public Mesa() {
    }

    public Mesa(String name_mesa, Integer capacity, Boolean is_active, String photo) {
        this.name_mesa = name_mesa;
        this.capacity = capacity;
        this.is_active = is_active;
        this.photo = photo;
    }

    public Set<Category> getCategories() {
        return this.categories;
    }

    public long getId() {
        return this.id;
    }

    public String getName_mesa() {
        return this.name_mesa;
    }

    public Integer getCapacity() {
        return this.capacity;
    }

    public Boolean isIs_active() {
        return this.is_active;
    }

    public Boolean getIs_active() {
        return this.is_active;
    }

    public String getPhoto() {
        return this.photo;
    }

    @Override
    public String toString() {
        return "{" +
                " id='" + getId() + "'" +
                ", name_mesa='" + getName_mesa() + "'" +
                ", capacity='" + getCapacity() + "'" +
                ", is_active='" + isIs_active() + "'" +
                ", photo='" + getPhoto() + "'" +
                "}";
    }
}