package com.ems.ems.controller;

import com.ems.ems.model.Basket;
import com.ems.ems.service.BasketService;
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
@RequestMapping("/baskets")
public class BasketController {

    private final BasketService basketService;

    public BasketController(BasketService basketService) {
        this.basketService = basketService;
    }

    @GetMapping
    public List<Basket> getAllBaskets() throws IOException {
        return basketService.getAllBaskets();
    }

    @GetMapping("/{id}")
    public Basket getBasketById(@PathVariable int id) throws IOException {
        return basketService.getBasketById(id);
    }

    @PostMapping
    public Basket createBasket(@RequestBody Basket basket) throws IOException {
        return basketService.createBasket(basket);
    }

    @PutMapping("/{id}")
    public Basket updateBasket(@PathVariable int id, @RequestBody Basket basket) throws IOException {
        return basketService.updateBasket(id, basket);
    }

    @DeleteMapping("/{id}")
    public void deleteBasket(@PathVariable int id) throws IOException {
        basketService.deleteBasket(id);
    }
}
