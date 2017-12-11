package com.hearme.si1labTwo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArtistasController {
	
	@Autowired
	private Artistas artistas;
	
	
	public Artista adicionaArtista(Artista artista) {
		if(artistaNaoExiste(artista)) {
			this.artistas.save(artista);
		}
		return artista;
	}
	
	private boolean artistaNaoExiste(Artista artista) {
		return !artistas.exists(artista.getId());
	}
	
	public Artista procuraArtista(Long id) {
		Artista artista = this.artistas.findOne(id);
		return artista;
	}
	

}
