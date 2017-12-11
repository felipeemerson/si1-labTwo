package com.hearme.si1labTwo;

import java.io.Serializable;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import java.util.List;

public class Artista implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private Long id;
	
	private String nome;
	private String imagemUrl;
	private Boolean favorito;
	private List<Album> albuns;
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getImagemUrl() {
		return imagemUrl;
	}
	public void setImagemUrl(String imagemUrl) {
		this.imagemUrl = imagemUrl;
	}
	public Boolean getFavorito() {
		return favorito;
	}
	public void setFavorito(Boolean favorito) {
		this.favorito = favorito;
	}
	public List<Album> getAlbuns() {
		return albuns;
	}
	public void setAlbuns(List<Album> albuns) {
		this.albuns = albuns;
	}
	
	public Long getId() {
		return this.id;
	}
	

}
