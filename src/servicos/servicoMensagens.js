const urlBase = 'https://backend-bcc-2-b.vercel.app/mensagem';

export async function gravarMensagens(mensagens){
    const resposta = await fetch(urlBase,{
        'method':"POST",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(mensagens)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarMensagens(mensagens){
    const resposta = await fetch(urlBase + "/" + mensagens.codigo,{
        'method':"PUT",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(mensagens)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirMensagens(mensagens){
    const resposta = await fetch(urlBase + "/" + mensagens.codigo,{
        'method':"DELETE"
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarMensagens() {
    const resposta = await fetch(urlBase,{
        'method':"GET"
    });
    const resultado = await resposta.json();
    return resultado;
}