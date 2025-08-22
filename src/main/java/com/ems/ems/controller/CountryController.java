package com.ems.ems.controller;

import com.ems.ems.model.Country;
import com.ems.ems.service.CountryService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/countries")
public class CountryController {

    private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping
    public List<Country> getAllCountries() throws IOException {
        return countryService.getAllCountries();
    }

    @GetMapping("/{id}")
    public Country getCountryById(@PathVariable int id) throws IOException {
        return countryService.getCountryById(id);
    }

    @PostMapping
    public Country createCountry(@RequestBody Country country) throws IOException {
        return countryService.createCountry(country);
    }

    @PutMapping("/{id}")
    public Country updateCountry(@PathVariable int id, @RequestBody Country country) throws IOException {
        return countryService.updateCountry(id, country);
    }

    @DeleteMapping("/{id}")
    public void deleteCountry(@PathVariable int id) throws IOException {
        countryService.deleteCountry(id);
    }
}
