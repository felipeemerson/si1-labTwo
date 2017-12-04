package com.hearme.si1labTwo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/artistas")
public class ArtistasController {
	
	@Autowired
	private Artista artistas;
	
	@GetMapping("/{id}")
	public Artista buscar(@PathVariable Long id) {
		return artistas.findOne(id);
	}
	
	@GetMapping
	public List<Artista> pesquisar(){
		return artistas.findAll();
	}
	
	@PostMapping
	public Artista salvar(@RequestBody Artista artista) {
		return artistas.save(artista);
	}
	
	@DeleteMapping("/{id}")
	public void deletar(@PathVariable Long id) {
		artistas.delete(id);
	}

}
