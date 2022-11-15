package com.springboot.springboot.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name_category")
    private String name_category;

    @Column(name = "photo")
    private String photo;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    }, mappedBy = "categories")
    @JsonIgnore
    private Set<Mesa> mesas = new HashSet<>();

    public Category() {

    }

    public Category(String name_category, String photo) {
        this.name_category = name_category;
        this.photo = photo;
    }

    public Set<Mesa> getMesas() {
        return this.mesas;
    }

    public long getId() {
        return this.id;
    }

    public String getName_category() {
        return this.name_category;
    }

    public String getPhoto() {
        return this.photo;
    }

    @Override
    public String toString() {
        return "{" +
                " id='" + getId() + "'" +
                ", name_category='" + getName_category() + "'" +
                ", photo='" + getPhoto() + "'" +
                "}";
    }

}