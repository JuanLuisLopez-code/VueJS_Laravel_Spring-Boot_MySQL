package com.springboot.springboot.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MesaQueryParam {
    private Integer capacity = 0;
    private String[] categories = new String[0];
    private Integer order = 0;
    private String name_mesa = "";
    private Integer page = 1;
    private Integer limit = 3;
}
