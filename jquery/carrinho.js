var umaPropaganda = function(){
	var propagandas = ["O que acha de comprar uma motocicleta?",
	                   "O que acha de comprar uma lancha?",
	                   "O que acha de comprar uma bicicleta?",
	                   "O que acha de comprar um carro?"
	                   ];
	
	var posicao = Math.floor(propagandas.length * Math.random());
	var texto = propagandas[posicao];
	var tr = $("<tr>").addClass("propaganda").append($("<td>"));
	tr.find("td").attr("colspan", 6).text(texto);
	return tr;
}

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

var daDestaque = function(){
	$(this).find(".remove-item").fadeIn();
	$(this).addClass("hovering");
}

var tiraDestaque = function(){
	$(this).find(".remove-item").fadeOut();
	$(this).removeClass("hovering");
}

var alternaPropagandas = function(event){
	event.preventDefault();
	$(".propaganda").fadeToggle();
	$(".alterna-propaganda").toggle();
}

// Funcao aposInicializado
var aposInicializado = function() {

	atualizaDados();
	//Define comportamento para qdo houver o clique no botao remover
	$(".remove-item").click(removeItem);
	//Define comportamento para qdo houver o clique no botao undo
	$(".undo").click(undo);
	
	$(".carrinho").each(function(){
		$(this).find("tr:nth-child(3n)").each(function(){
			umaPropaganda().insertAfter($(this));
		});
	});
	$(".carrinho tbody tr").hover(daDestaque, tiraDestaque);
	$(".alterna-propaganda").click(alternaPropagandas);
	
	
};

/*
 * CHAMANDO A FUNÇÃO, NÓS INFORMAMOS AO JQUERY QUE ELE SOMENTE DEVERA EXECUTAR A
 * FUNCAO, APÓS CARREGAMENTO COMPLETO DA PAGINA
 */
$(aposInicializado);
