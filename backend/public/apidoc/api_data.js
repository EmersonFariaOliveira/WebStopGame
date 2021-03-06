define({ "api": [
  {
    "type": "post",
    "url": "localhost:5000/createMatch",
    "title": "",
    "version": "1.0.0",
    "name": "GetDashboard",
    "group": "Criar_Partida",
    "description": "<p>Inserção de uma nova partida na plataforma de webstop - online</p>",
    "examples": [
      {
        "title": "Exemplo de uso:",
        "content": "{\n  \"nome\": \"Minha partida\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "texto",
            "description": "<ul> <li>Jogo: &quot;Minha partida&quot; foi criado com sucesso!!.</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>The <code>505</code> of the problem in query.</p>"
          }
        ]
      }
    },
    "filename": "./app.js",
    "groupTitle": "Criar_Partida"
  },
  {
    "type": "post",
    "url": "localhost:5000/createUser",
    "title": "",
    "version": "1.0.0",
    "name": "GetDashboard",
    "group": "Criar_usuario",
    "description": "<p>Inserção de novos usuarios na plataforma de webstop - online</p>",
    "examples": [
      {
        "title": "Exemplo de uso:",
        "content": "{\n  \"user\": \"name\",\n  \"email\": \"name@email.com\"\n  \"password\": \"pwd\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "texto",
            "description": "<ul> <li>Usuário criado com sucesso.</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>The <code>505</code> of the User was not create.</p>"
          }
        ]
      }
    },
    "filename": "./app.js",
    "groupTitle": "Criar_usuario"
  },
  {
    "type": "post",
    "url": "localhost:5000/sendGame",
    "title": "",
    "version": "1.0.0",
    "name": "GetDashboard",
    "group": "Enviar_jogo",
    "description": "<p>Inserção de dados da partida</p>",
    "examples": [
      {
        "title": "Exemplo de uso:",
        "content": "{\n  \"idGame\": 1,\n  \"idUser\": 1,\n  \"name\": \"Aaaaa\",\n  \"city\": \"Aaaaa\",\n  \"animal\": \"Appod\",\n  \"fruit\": \"Abbrr\",\n  \"color\": \"Abbbcc\",\n  \"career\": \"Acdc\",\n  \"car\": \"Abbbcc\",\n  \"movie\": \"Aaabb\",\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "texto",
            "description": "<ul> <li>Dados gravados com sucesso!!.</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>The <code>505</code> of the problem in query.</p>"
          }
        ]
      }
    },
    "filename": "./app.js",
    "groupTitle": "Enviar_jogo"
  },
  {
    "type": "post",
    "url": "localhost:5000/index",
    "title": "",
    "version": "1.0.0",
    "name": "GetDashboard",
    "group": "Login",
    "description": "<p>Inserção de informações para login na plataforma de webstop - online</p>",
    "examples": [
      {
        "title": "Exemplo de uso:",
        "content": "{\n  \"user\": \"name\",\n  \"password\": \"pwd\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "texto",
            "description": "<ul> <li>Usuário valido.</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>404</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "./app.js",
    "groupTitle": "Login"
  },
  {
    "type": "get",
    "url": "localhost:5000/index",
    "title": "",
    "version": "1.0.0",
    "name": "GetDashboard",
    "group": "Pagina_Inicial",
    "description": "<p>Pagina inicial para login dentro da plataforma de webstop - online</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "--",
            "description": "<ul> <li>Home page.</li> </ul>"
          }
        ]
      }
    },
    "filename": "./app.js",
    "groupTitle": "Pagina_Inicial"
  },
  {
    "type": "get",
    "url": "localhost:5000/searchMatch",
    "title": "",
    "version": "1.0.0",
    "name": "GetDashboard",
    "group": "Pesquisa",
    "description": "<p>Pesquisa de partidas livre na plataforma</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<ul> <li>Nome das partidas disponíveis.</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>The <code>505</code> of the problem in query.</p>"
          }
        ]
      }
    },
    "filename": "./app.js",
    "groupTitle": "Pesquisa"
  },
  {
    "type": "post",
    "url": "localhost:5000/removeUser",
    "title": "",
    "version": "1.0.0",
    "name": "GetDashboard",
    "group": "Remover_usuario",
    "description": "<p>Remover usuario da plataforma webstop - online</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "BearerToken",
            "description": "<ul> <li>Users require access-key.</li> </ul>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Exemplo de uso:",
        "content": "{\n  \"id\": \"1\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "texto",
            "description": "<ul> <li>Usuário removido com sucesso!.</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>The <code>505</code> of the problem in query.</p>"
          }
        ]
      }
    },
    "filename": "./app.js",
    "groupTitle": "Remover_usuario"
  },
  {
    "type": "post",
    "url": "localhost:5000/updatePerfil",
    "title": "",
    "version": "1.0.0",
    "name": "GetDashboard",
    "group": "Update_perfil_de_usuario",
    "description": "<p>Atualiza as vitoria, derrota e pontuacap da plataforma webstop - online</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "BearerToken",
            "description": "<ul> <li>Users require access-key.</li> </ul>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Exemplo de uso:",
        "content": "{\n    \"id\": 2,\n    \"vitoria\": 0,\n    \"derrota\": 0,\n    \"pontuacao\": 0\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "texto",
            "description": "<ul> <li>Perfil atualizado com sucesso!.</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>The <code>505</code> of the problem in query.</p>"
          }
        ]
      }
    },
    "filename": "./app.js",
    "groupTitle": "Update_perfil_de_usuario"
  }
] });
