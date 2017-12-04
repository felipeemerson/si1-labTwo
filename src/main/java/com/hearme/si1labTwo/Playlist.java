package com.hearme.si1labTwo;

import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class Playlist {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private Long id;
	
	private String nome;
	private List<String> musicas;
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public List<String> getMusicas() {
		return musicas;
	}
	public void setMusicas(List<String> musicas) {
		this.musicas = musicas;
	}
}
