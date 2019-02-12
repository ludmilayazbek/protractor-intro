Feature: pesquisa Simples
    Scenario: pesquisa no google
        Given acesso a pagina do google
        When realizo uma pesquisa
        Then recebo os resultados da pesquisa