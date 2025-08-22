package com.ems.ems.controller;

import com.ems.ems.model.Rank;
import com.ems.ems.service.RankService;
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
@RequestMapping("/ranks")
public class RankController {

    private final RankService rankService;

    public RankController(RankService rankService) {
        this.rankService = rankService;
    }

    @GetMapping
    public List<Rank> getAllRanks() throws IOException {
        return rankService.getAllRanks();
    }

    @GetMapping("/{id}")
    public Rank getRankById(@PathVariable int id) throws IOException {
        return rankService.getRankById(id);
    }

    @PostMapping
    public Rank createRank(@RequestBody Rank rank) throws IOException {
        return rankService.createRank(rank);
    }

    @PutMapping("/{id}")
    public Rank updateRank(@PathVariable int id, @RequestBody Rank rank) throws IOException {
        return rankService.updateRank(id, rank);
    }

    @DeleteMapping("/{id}")
    public void deleteRank(@PathVariable int id) throws IOException {
        rankService.deleteRank(id);
    }
}
