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
    private Integer capacity;
    private String[] categories;
    private Integer order;
    private String name_mesa;
    private Integer page;
    private Integer limit;
}
