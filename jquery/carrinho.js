

//Funcao para atualizar dadoas
var atualizaDados = function() {
	
	var carrinhos = $(".carrinho");
	carrinhos.each(function(){
			var carrinho = $(this);
			//pegaremos somente o elementos com class=item-total que estão visibles (usando extensão :visible, :hidden...)
			var itens = carrinho.find(".item-total:visible");
			var total = 0;
			for (var i = 0; i < itens.length; i++) {
				var conteudo = $(itens[i]).text();
				var valor = parseFloat(conteudo);
				total += valor;
			}
			carrinho.find(".valor-total").text(total);
			carrinho.find(".quantidade-de-itens").text(itens.length);
		
		
	});

}

// Funcao removeITem
var removeItem = function(event) {
	// Previne (nao deixa executar) comportamento padrao (padrao é que qdo
	// clicamos, vamos para outra pagina)
	event.preventDefault();

	var self = $(this);
	// Escondera o elemento tr (pai, avo, bisavo) mais proximo dentro da arvore
	// onde ele esta localizado, nao busca na pagina
	// inteira, somente na arvore dele.
	//self.closest("tr").remove();
	self.closest("tr").hide();

	/*
	 * var atual = parseInt($("#quantidade-de-itens").text()); var novaQtde =
	 * atual - 1; $("#quantidade-de-itens").text(novaQtde);
	 * 
	 * var precoAtual = parseFloat($("#valor-total").text()); // var preco =
	 * parseFloat(self.parent().prev().text()); //Ira localizar o elemento com
	 * class=item-total dentro do mais proximo(dentro da mesma arvore) tr que
	 * estamos var preco =
	 * parseFloat(self.closest("tr").find(".item-total").text()); var precoFinal =
	 * precoAtual - preco; $("#valor-total").text(precoFinal);
	 */

	atualizaDados();
};

var undo = function(){
	
	//Pegara o carrinho em qual estamos
	var carrinho = $(this).closest(".carrinho");
	
	//Retira classe css recuperado de todo mundo que esta visible
	carrinho.find("tr:visible").removeClass("recuperado");
	
	//pegara todos os elementos TR que estiverem HIDEN dentro da pagina
	var trs = carrinho.find("tr:hidden");
	trs.addClass("recuperado").show();
	
	atualizaDados();
	
};

// Funcao aposInicializado
var aposInicializado = function() {

	atualizaDados();
	//Define comportamento para qdo houver o clique no botao remover
	$(".remove-item").click(removeItem);
	//Define comportamento para qdo houver o clique no botao undo
	$(".undo").click(undo);

};

/*
 * CHAMANDO A FUNÇÃO, NÓS INFORMAMOS AO JQUERY QUE ELE SOMENTE DEVERA EXECUTAR A
 * FUNCAO, APÓS CARREGAMENTO COMPLETO DA PAGINA
 */
$(aposInicializado);
