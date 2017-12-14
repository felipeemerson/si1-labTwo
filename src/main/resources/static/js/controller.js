app.controller("hearMeController", function($scope){
	$scope.artistas = [];
	$scope.playlists = [];
	$scope.musicasNoSistema = [];
	$scope.usuarios = [];
	$scope.usuarioLogado = null;

	$scope.novoArtista = {};

	$scope.adicionaArtista = function() {
		if(!$scope.artistaExiste($scope.novoArtista.nome)){
			$scope.validaImagem();

			var artista = angular.copy($scope.novoArtista);
			artista.id = Date.now();
			artista.albuns = [];
			artista.nota = 'N/A';
			artista.ultimaMusica = 'N/A';
			artista.favorito = false;
			$scope.usuarioLogado.artistas.push(artista);
			$scope.novoArtista = {};
			alert(artista.nome + ' adicionado(a)!');
		}else {
			alert('Artista já existe!');
		}
	}

	$scope.artistaExiste = function(nome){ 
		for(var indiceArtista = 0; indiceArtista < $scope.usuarioLogado.artistas.length; indiceArtista++){
			if(nome == $scope.usuarioLogado.artistas[indiceArtista].nome){
				return true;
			}
		}
		
		return false;
	}
	
	$scope.validaImagem = function() {
		if($scope.novoArtista.imagemUrl === undefined || $scope.novoArtista.imagemUrl == ''){
			$scope.novoArtista.imagemUrl = 'img/no-image.png';
		}
	}
	
	$scope.novaMusica = {};
	$scope.albumExiste = false;
	$scope.albumExistente = {};
	$scope.musicaExiste = false;
	
	$scope.adicionaMusica = function() {
		var musica = {};
		musica.nome = $scope.novaMusica.nome;
		musica.ano = $scope.novaMusica.ano;
		musica.duracao = $scope.novaMusica.duracao;

		$scope.validaMusica();

		if (!$scope.artistaExiste($scope.novaMusica.artista)){
			alert('Artista não existe!');
		} else if($scope.musicaExiste) {
			alert('Música já existe!');
		} else if($scope.albumExiste){
			$scope.albumExistente.musicas.push(musica);
			$scope.usuarioLogado.musicasNoSistema.push({nome: $scope.novaMusica.nome, artista: $scope.novaMusica.artista});
			alert('Música adicionada no álbum: ' + $scope.albumExistente.nome);
		} else {
			var novoAlbum = {};
			novoAlbum.nome = $scope.novaMusica.album;
			novoAlbum.musicas = [];
			novoAlbum.musicas.push(musica);
			$scope.usuarioLogado.musicasNoSistema.push({nome: $scope.novaMusica.nome, artista: $scope.novaMusica.artista});

			for(var indiceArtista = 0; indiceArtista < $scope.usuarioLogado.artistas.length; indiceArtista++){
				if($scope.novaMusica.artista == $scope.usuarioLogado.artistas[indiceArtista].nome){
					$scope.usuarioLogado.artistas[indiceArtista].albuns.push(novoAlbum);
					alert('Música adicionada no álbum: ' + novoAlbum.nome);
				}
			}
		}

		$scope.novaMusica = {};
		$scope.albumExiste = false;
		$scope.albumExistente = {};
		$scope.musicaExiste = false;
	}

	$scope.validaMusica = function() {
		for(var indiceArtista = 0; indiceArtista < $scope.usuarioLogado.artistas.length; indiceArtista++){

			for(var indiceAlbum = 0; indiceAlbum < $scope.usuarioLogado.artistas[indiceArtista].albuns.length; indiceAlbum++){

				if($scope.novaMusica.artista == $scope.usuarioLogado.artistas[indiceArtista].nome && $scope.novaMusica.album == $scope.usuarioLogado.artistas[indiceArtista].albuns[indiceAlbum].nome){
					$scope.albumExiste = true;
					$scope.albumExistente = $scope.usuarioLogado.artistas[indiceArtista].albuns[indiceAlbum];

					for(var indiceMusica = 0; indiceMusica < $scope.usuarioLogado.artistas[indiceArtista].albuns[indiceAlbum].musicas.length; indiceMusica++){
						if($scope.novaMusica.nome == $scope.usuarioLogado.artistas[indiceArtista].albuns[indiceAlbum].musicas[indiceMusica].nome){
							$scope.musicaExiste = true;
							return;
						}
					}

					return;	
				}
				
			}
			
		}
	}

	$scope.removeFavorito = function(artista) {
		if(confirm("Excluir " + artista.nome + " dos favoritos?")){
			artista.favorito = false;
		}
		
	}

	$scope.NOTA_NAO_ESCOLHIDA = -1;
	$scope.nota = {valor: $scope.NOTA_NAO_ESCOLHIDA};
	$scope.ultimaMusica = {};

	$scope.adicionaNota = function(artista) {
		if($scope.nota.valor == $scope.NOTA_NAO_ESCOLHIDA){
			return;
		}

		artista.nota = $scope.nota.valor;
		$scope.nota.valor = $scope.NOTA_NAO_ESCOLHIDA;
	}

	$scope.modificaUltimaMusica = function(artista) {
		if($scope.ultimaMusica.nome == "-- Selecione uma música --" || $scope.ultimaMusica.nome == undefined){
			return;
		}

		artista.ultimaMusica = $scope.ultimaMusica.nome;
		$scope.ultimaMusica = {};
	}


	$scope.novaPlaylist = {};

	$scope.adicionaPlaylist = function() {
		var playlist = {};
		if(!$scope.verificaNomePlaylist()){
			alert("A playlist já existe!");
		} else {
			playlist.nome = $scope.novaPlaylist.nome;
			playlist.id = Date.now();
			playlist.musicas = [];
			$scope.usuarioLogado.playlists.push(playlist);
		}
		
		$scope.novaPlaylist = {};
	}

	$scope.removePlaylist = function(playlist){
		if(confirm("Excluir a playlist " + playlist.nome + "?")){
			for(var indicePlaylist = 0; indicePlaylist < $scope.usuarioLogado.playlists.length; indicePlaylist++){
				if($scope.usuarioLogado.playlists[indicePlaylist].nome == playlist.nome){
					$scope.usuarioLogado.playlists.splice(indicePlaylist, 1);
				}
			}
		}	
	}

	$scope.verificaNomePlaylist = function() {
		for(indicePlaylist = 0; indicePlaylist < $scope.usuarioLogado.playlists.length; indicePlaylist++){
			if($scope.usuarioLogado.playlists[indicePlaylist].nome == $scope.novaPlaylist.nome){
				return false;
			}
		}
		return true;
	}

	$scope.novaMusicaNaPlaylist = {};

	$scope.adicionaMusicaNaPlaylist = function(playlist) {
		if($scope.novaMusicaNaPlaylist.nome == "-- Selecione uma música --" || $scope.novaMusicaNaPlaylist.nome == undefined){
			if($scope.usuarioLogado.musicasNoSistema.length == 0){
				alert('Nenhuma música cadastrada no sistema! Adicione músicas!');
				return;
			} else {
				alert('Escolha uma música!');
				return;
			}
			
		}

		if($scope.musicaEstaNaPlaylist(playlist, $scope.novaMusicaNaPlaylist.nome)){
			alert('Música já está na playlist');

		} else {
			playlist.musicas.push($scope.novaMusicaNaPlaylist.nome);
			alert($scope.novaMusicaNaPlaylist.nome + ' adicionada!');	
		}
		
		$scope.novaMusicaNaPlaylist = {};		
	}

	$scope.musicaEstaNaPlaylist = function(playlist, musica) {
		for(var indiceMusica = 0; indiceMusica < playlist.musicas.length; indiceMusica++){
			if(playlist.musicas[indiceMusica] == musica){
				return true;
			}
		}

		return false;
	}

	$scope.removerMusicaDaPlaylist = function(playlist, musica) {
		if(confirm("Excluir a música " + musica + " da playlist " + playlist.nome + "?")){
			for(var indiceMusica = 0; indiceMusica < playlist.musicas.length; indiceMusica++){
				if(playlist.musicas[indiceMusica] == musica){
					playlist.musicas.splice(indiceMusica, 1);
					break;
				}				
			}
		}
	}

	$scope.novoUsuario = {};

	$scope.registrarUsuario = function() {
		if($scope.senhasDiferentes()){
			alert('As senhas são diferentes! Tente novamente!');
		} else {
			if($scope.usuarioValido()){
				var usuario = {};
				usuario.nome = $scope.novoUsuario.nome;
				usuario.email = $scope.novoUsuario.email;
				usuario.senha = $scope.novoUsuario.senha;
				usuario.artistas = [];
				usuario.playlists = [];
				usuario.musicasNoSistema = [];
				$scope.usuarios.push(usuario);
				alert('Usuário: ' + $scope.novoUsuario.nome + ' adicionado!');
			} else {
				alert('Usuário já existe!');
			}
		}

		$scope.novoUsuario = {};
	}

	$scope.usuarioValido = function(){
		for(var indiceUsuario = 0; indiceUsuario < $scope.usuarios.length; indiceUsuario++){
			if($scope.usuarioExiste($scope.usuarios[indiceUsuario])){
				return false;
			}
		}

		return true;
	}

	$scope.usuarioExiste = function(usuarioAtual){
		if($scope.novoUsuario.email == usuarioAtual.email){
			return true;
		}

		return false;
	}

	$scope.senhasDiferentes = function(){
		return $scope.novoUsuario.senha != $scope.novoUsuario.senhaRepetida;
	}

	$scope.novoUsuarioLogin = {};

	$scope.fazerLogin = function(){
		if($scope.emailNaoExiste()){
			alert('Usuário não registrado!');
		} else {
			for(var indiceUsuario = 0; indiceUsuario < $scope.usuarios.length; indiceUsuario++){
				if($scope.novoUsuarioLogin.emailLogin == $scope.usuarios[indiceUsuario].email){
					if($scope.novoUsuarioLogin.senhaLogin == $scope.usuarios[indiceUsuario].senha){
						$scope.usuarioLogado = $scope.usuarios[indiceUsuario];
						alert('Usuário: ' + $scope.usuarioLogado.nome + ' logado!');
					} else {
						alert('Senha errada!');
					}
				}
			}
		}
		
		$scope.novoUsuarioLogin = {};
	}

	$scope.emailNaoExiste = function(){
		for(var indiceUsuario = 0; indiceUsuario < $scope.usuarios.length; indiceUsuario++){
			if($scope.novoUsuarioLogin.emailLogin == $scope.usuarios[indiceUsuario].email){
				return false;
			}
		}

		return true;
	}
	
});	