import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-card-prev',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
    ClipboardModule,
  ],
  templateUrl: './card-prev.component.html',
  styleUrl: './card-prev.component.css',
})
export class CardPrevComponent {
  formData: any = {
    text1: '',
    text2: '',
  };
  cardDisplayStyle: string = 'none';
  addValuesButtonDisplay: string = 'block';
  generateCardButtonDisplay: string = 'none';
  cardData: any;

  cards = [
    {
      id: 1,
      title: 'Como começar',
      bodycontent:
        'Primeiro no template, (template é o lugar aonde você ve as coisas acontecerem, ou seja no component.html) você cria os elementos que vão receber os dados que você deseja inserir',
      contentdisplay:
        'teremos um elemento h1 que vai receber o titulo por exemplo, um img que vai receber a url da img, um <h3> e um <p> para o conteúdo. Clica no button la encima por favor',
      img: '/assets/images/1.png',
      intro:
        'Hoje voce vai aprender algumas funcionalidades do angular binding e vamos criar cards que são mostrados em "circulo"',
      intro2:
        'Porém vou ensinar do jeito que eu entendo então se voce ainda e iniciante pode ser um bom ponto de partida seguir a pág',
    },
    {
      id: 2,
      title: 'Agora no component.ts(typescript)',
      bodycontent:
        'Você deve armazenar os dados que serão inseridos nos elementos em algum lugar certo? Então vamos criar uma variável para isso e já colocar nossos dados lá',
      contentdisplay:
        'Aqui então temos a seguinte estrutura, 1° você tem uma variável chamada cards = [](que na realidade é uma lista), dentro dela temos os dados que queremos que sejam inseridos dentro do nosso template, entao temos o title(titulo), bodycontent(conteúdo), morecontent(mais conteúdo), contentdisplay(mais conteúdo), esses nomes colocados nao afetam em nada sua aplicação é apenas uma boa prática especificar pelo nome exatamente o que cada coisa dentro da nossa lista representa, pensando assim o objeto ~title~ poderia ter o nome de ~bolinha~ que nao afetaria em nada no funcionamento, repare também que temos mais de um objeto dentro da nossa lista (cards), que são representados por ID, então temos o 1° o 2° e o 3°, porém podem ser infinitos objetos adapte conforme necessário. Clica no button la encima por favor',
      img: 'assets/images/2.png',
    },
    {
      id: 3,
      title: 'Agora devemos puxar esses dados no nosso card correto?',
      img: '/assets/images/3.png',
      bodycontent:
        'Voltaremos dentro do nosso template(component.html), e vamos adicionar estes dados:',
      contentdisplay:
        '1° foi adicionado um <button> com um event de (click)="generateCard"(), esse button será responsavel por puxar nossos dados, o nome generateCard é algo relativo como ja foi dito, nos elementos <h1>, <h3>, <p> e o novo elemento <img>, estão recebendo alguns atributos agora repare que dentro de cada elemento aonde você vai inserir o dado contém duas chaves {{}}, envolvendo alguns dados {{cards[currentCardIndex].title (dado da lista Ex: title)}}, o que estamos fazendo é : 1° denominamos aonde o elemento h1 vai buscar o dado e que lugar e esse? Dentro da lista "CARDS", entao primeiro referenciamos ele, 2° em colchetes está o que se tornará um indice, "currentcardindex", após isso colocamos um ".", e referenciamos o dado que desejamos inserir neste elemento, se quisermos pegar o title entao faremos > cards[current...].title, faremos conforme inserimos os dados dentro da nossa lista. Clica no button la encima por favor',
    },
    {
      id: 4,
      title: 'Retornando ao nosso component.TS',
      bodycontent:
        'ficamos com algumas pendências para adicionar dentro do nosso typescript então adicione este trecho no seu component.TS',
      contentdisplay:
        'Lembram da nossa função click generateCard e nossa variavel currentCardIndex? pois bem agora vamos entender o que elas vão fazer por nós... 1° por que precisamos de um indice? Neste exemplo em especifico teremos mais de um card ou seja, o card com id 1, id 2 , id 3 e id 4 o indice servirá para refenciarmos de onde a nossa função vai começar a mostrar o card, ou seja do 1° até o ultimo(lembrando que, a máquina entende que o numero 0 é igual a o 1 ou seja ele é considerado como o primeiro), então vamos entender melhor o que se passa, apos criarmos o indice(variavel), e darmos o valor de 0, vamos começar a implementar o "movimento" na nossa aplicação, a primeira linha da nossa função generateCard "this.currenCardIndex++", esta e outra variavel, a responsabilidade dela e acompanhar qual e o indice atual do card que esta sendo exibido e incrementar a variavel, ou seja, toda vez que o button for clicado essa variavel vai adicionar mais 1 dentro do nosso indice, por exemplo começamos em 0, clicamos agora estará em 1 e assim por diante, porém neste cenario se clicassemos mais de 4 vezes teriamos um erro, pois ultrapassaria o limite da nossa lista "cards", que é de 4 objetos pois ele iria procurar pelo 5 objeto dentro da nossa lista retornado um valor nulo, zerado, inexistente, tendeu? então como resolver isso manoLe? mermao vamo bota um cilculo ai, cilculo? é meu bom um metodo de circulo, infinito, 8 oque voce preferir chamar, então esse sera o papel da nossa estrutura if, então traduzindo a linha pra vocês mortais, se a variavel currentcardindex estiver com o numero maior que o numero maximo de objetos dentro da nossa lista cards então ela vai retornar pro numero... adivinha 0 mermao primeiro, id 1, o first entao oq a gente fez hj? ',
      img: '/assets/images/4.png',
      resumo:
        'Simplificamos um meio de fazer uma coisa kk, então ao invés de você criar 4 5 6 8 12 cards, você cria apenas um card, esse card vai conter os elementos aonde você gostaria de adicionar determinado valor, apos isso armazenamos os valores de cada card em uma lista, depois fazemos o BINDING dos valores para o nosso card, é assim que a gente retorna os dados de um banco enoooorme mas isso e assunto pro proximo tuto :D, então agora e sua hora de pensar nas possibilidades ai mermão, faz assim pega aquele projeto antigo que tem 12 cards e tenta fazer isso lá até voce entender bem e começar a pensar aonde você consegue aplicar isso, é assim que eu faço e assim que varias pessoas fazem para aprender bro, lê artigo, depois tenta fazer, erra, conserta, erra dnv, conserta fica feliz, ensina esse é o ciclo do dev irmão, assim você aprende, se voce consegue fazer um newbie entender e por que você aprendeu mermo como fazer, e ai cz você vai aprender outras coisas ps: eu não adicionei a url na img então e so você seguir a mesma logica e adicionar a imagem ai',
      resumotitle: 'Então agora toma o resumão',
    },
  ];

  bonus = [
    {
      inputs1:
        'Deixa o pai explicar o que houve aqui, sem ser formal nego veio a gente fez o seguinte colocamos dois inputs pra trampa pa nós, ou seja a gente só jogou o valor ali aperto o button pra add valores, e dps o de gerar card e ele %Gerou os cards com os valores :D%, da hora né? Deixa eu te explicar uma coisa, quando você vê uma página que é um ~blog~ não vai achando que cada post é feito na mão igual fizemos ai ñ, existe uma coisa chamada CMS--Content Management System, disgraça é isso tio Lê??',
      inputs2:
        'Na traducion geral fica sistema de controle de conteúdo, e oq faz isso ?',
      inputs3:
        'Exatamente o que fizemos aqui, adiciona dinamicamente conteúdos, po mas aonde eu consigo ver isso ao vivo?',
      inputs4:
        'Pega o Instagram, quando tu adiciona uma fotinha nova, você tem um input pra por a foto, pra por legenda, pra por uma musica, localização etc.. isto é um CMS gurizada, Ahh mas aonde eu vou usar isso carai sou iniciante....... Meu bom pega uma visão co pai, hoje mesmo tu deve ta sonhando com tua vaguinha certo?',
      inputs5:
        'Vamo supor que você quer fazer um ~Portifólio Matador~, 1° tu tem que ter projetos correto, 2° tu precisa adicionar esses projetos, 3° Você DEVE estar em constante aprendizado logo : "Projetos novos vão surgir", ou seja tu não vai ficar criando um cardizinho pra por a imagem, title, content toda vez que for adicionar um projeto novo né tio? Tu só cria um formulário pra adicionar esses dados e linka ele com um banco de dados e depois retorna esses dados no seu template e então...',
      meme: '|__(*-*)__/ *MagicHappens*',
      inputs6: ' por@$#, mas isso é osso de fazer... ',
      inputs7:
        'É mas alguém já fez irmão VOCÊ SO PRECISA ENTENDER COMO ELE FEZ, mano leia, lê dnv, tenta erra tenta de novo disgraça u m a h o r a v a i d a r c e r t o',
      inputs8:
        'Logo mais eu trago o passo a passo ensinando você a fazer esse formulario com banco de dados e coisarada tá bom?',
    },
  ];

  bonusidx = [
    {
      id: 1,
      bonus: 'Agora se vai ver como eu fiz esse form aí.',
      bodyct: 'Primeiro o que ele ta fazendo? Segue o codigin e a explicação: ',
      img: '/assets/images/img1bonus.png',
      anwser1:
        'No Elemento Form vamos por uma function chamada OnSubmit e no button generateCard vai ser colocado a function "genCard" então seu component HTML vai ficar assim.',
      anwser:
        'Ele tem dois inputs, esses inputs esperam um valor, esse valor é adicionado a uma variavel assim que o button Add Valores é clicado, essa variável é a formData, ela vai esperar dois valores text1 e text2. ',
    },
    {
      id: 2,
      bonus: 'Agora como que esses valores vão pra lá?   ',
      img: 'assets/images/img3bonus.png',
      anwser1: 'No component.ts, adicione estas variáveis:',
      anwser3: 'Adicione Agora algumas funções : ',
      img2: '/assets/images/img2bonus.png',
      resumao:
        'Então o que que tá acontecendo? Seguinte temos nosso form, esse form tem os inputs que vão receber um valor X, esses valores vão ser adicionados a variável formData, o log é apenas pra verificar se chegaram os valores tudo certinho, o generateCardButtonDisplay vai trocar o display do button gerarCard que é none para FLEX, a função genCard possui uma verificação então ela vai ver se existe algum valor dentro da FormData, então se tiver ele adiciona esses valores para serem inseridos na tabela, a cardDisplayStyle, apenas muda o display da tabela de none para block (Eu compliquei as coisas mas era só pra ficar mais dinâmico o conteúdo xD)',
      finals:
        'Então meu amigo(a), fiz esse simples tutorialzinho para que seja um pouco mais simples de entender a documentação, pq se sabe que tem tudo isso e mais nas documentações né?? Mas as vezes é um pouco complicado pra interpretar, então é isso que eu quero fazer aqui, dar um jeito de deixar as coisas mais *simples*, tanto pra mim quanto pra vocês fecho? abraços deixa u like no git tamo junto, aguardem mais porque vai ter muito mais Bjo no core',
    },
  ];

  onSubmit() {
    this.formData = {
      text1: this.formData.text1,
      text2: this.formData.text2,
    };
    console.log('Form Data:', this.formData);

    this.generateCardButtonDisplay = 'block';
  }

  genCard() {
    if (this.formData.text1 !== '' && this.formData.text2 !== '') {
      this.cardData = {
        text1: this.formData.text1,
        text2: this.formData.text2,
      };
    }
    this.cardDisplayStyle = 'flex';
  }

  currentCardIndex = 0;

  generateCard() {
    this.currentCardIndex++;
    if (this.currentCardIndex >= this.cards.length) {
      this.currentCardIndex = 0;
    }
  }

  newidex = 0;
  bonusCards() {
    this.newidex++;
    if (this.newidex >= this.bonusidx.length) {
      this.newidex = 0;
    }
  }

  getContentForId(id: number): string {
    switch (id) {
      case 1:
        return `
        <div class="div" style="display: flex; flex-direction: column; justify-content: center; width: 100%; align-items: center;">
        <div class="dive" style="display: flex; width: 50%; flex-direction: column;">
          <h1></h1>
          <p></p>
          <button></button>
          <img src="" alt="">
          <h1></h1>
          <h3></h3>
          <p></p>
        </div>
      </div>
        `;
      case 2:
        return `
        cards = [
          { id: 1, title : 'Another title', bodycontent : 'More content', contentdisplay: 'Even more content'},
          { id: 1, title : 'Yet another title', bodycontent : 'More Rules', contentdisplay: 'Blablalb'},
          { id: 1, title : 'Hello title', bodycontent : 'Love u', contentdisplay: 'Loremipsummmm'}
        ];
        `;
      case 3:
        return `
          <button id="cardgenerator" (click)="generateCard()">Clique aqui pra começarmos</button
          <h1 >{{ cards[currentCardIndex].bodycontent }}</h1>
          <h3 >{{ cards[currentCardIndex].bodycontent }}</h3>
          <img src="{{cards[currentCardIndex].img}} alt=""
          <p >{{ cards[currentCardIndex].bodycontent }}</p>
          `;
      case 4:
        return `
            currentCardIndex = 0;

            generateCard() {
              this.currentCardIndex++;
              if (this.currentCardIndex >= this.cards.length) {
                this.currentCardIndex = 0;
              }
            }
            `;
      
      default:
        return '';
    }
  }
  gCBId(id: number): string {
    switch (id) {
      case 1:
        return `
        <div class="form-container mt-12 flex justify-center">
          <form (ngSubmit)="onSubmit()" #form="ngForm">
            <div class="form-group">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="textInput1">
                Digita alguma coisa ae
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 
                text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="textInput1" type="text"
                name="text1" [(ngModel)]="formData.text1">
            </div>
            <div class="form-group">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="textInput1">
                  Aqui também
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 
                text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="textInput2" type="text"
                  name="text2" [(ngModel)]="formData.text2">
              </div>
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold 
            py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Add Valores</button>
            <br>
            <button style="display: none;" class="bg-blue-500 hover:bg-blue-700 text-white 
            font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-8" (click)="genCard()"
              [style.display]="generateCardButtonDisplay">Generate Card</button>
          </form>
      </div>
      <div *ngIf="cardData" class="flex justify-center" [style.display]="cardDisplayStyle">
        <table class="table-fixed shadow-xl">
          <thead>
            <tr>
              <th class="w-1/2 px-4 py-2">1° input</th>
              <th class="w-1/4 px-4 py-2">2° input</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">{{cardData.text1}}</td>
              <td class="border px-4 py-2">{{cardData.text2}}</td>
            </tr>
          </tbody>
        </table>
    </div>
              `;
      case 2:
        return `
            formData: any = {
              text1: '',
              text2: '',
            };
            cardDisplayStyle: string = 'none';
            addValuesButtonDisplay: string = 'block';
            generateCardButtonDisplay: string = 'none';
            cardData: any;
            `;
      default:
        return '';
    }}

    value = `onSubmit() {
      this.formData = {
        text1: this.formData.text1,
        text2: this.formData.text2,
      };
      console.log('Form Data:', this.formData);
  
      this.generateCardButtonDisplay = 'block';
    }
  
    genCard() {
      if (this.formData.text1 !== '' && this.formData.text2 !== '') {
        this.cardData = {
          text1: this.formData.text1,
          text2: this.formData.text2,
        };
      }
      this.cardDisplayStyle = 'flex';
    }`


    
}

