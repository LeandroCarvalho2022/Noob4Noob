import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Injectable } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxColorsModule } from 'ngx-colors';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { Theme } from '../../../models/theme';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-colorpicker',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    NgxColorsModule,
    MatFormField,
    FormsModule,
    MatIconModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './colorpicker.component.html',
  styleUrl: './colorpicker.component.css',
})
export class ColorpickerComponent {
  input1: string = '#00897B';
  selectedTheme: keyof Theme = 'light';
  isDarkMode: boolean = false;

  colors: Theme[] = [];

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.selectedTheme = this.selectedTheme === 'light' ? 'dark' : 'light';
  }

  index = 0;

  texts = [
    {
      presentation:
        'Vou te apresentar o ColorPicker, e como foi a primeira vez que usei ele. A página você usa clicando nos buttons ali na aba de action buttons ~next para avançar~ e ~Voltar para voltar~',
    },
    {
      resume: 'Mas oq é o color picker? Clica aqui no iconezin.',
      icon: 'palette',
    },
    {
      review:
        'Veja que voce pode selecionar algumas cores pré selecionadas ou selecionar uma que voce queira por meio da paleta.',
      img: '/assets/images/tutoscards/pickercolor.png',
      why: 'Blz parsa mas onde se uso isso bro?',
      here: 'pega a visao aq co pai, de como vc pode usar isso e ganhar uma xpe da hora',
    },
    {
      presentation:
        'Imagina que você tem uma e-loja, e ta chegando a data da black fraude, você quer chamar mais leads(clientes) pra suas promo de black, e qual o tema da black?? preto ne caraio entao vc qer seu site mais ~DARK~ por assim dizer, po mas como voce um vendedor vai faze isso no site se vc n manja nd de programação?',
      img: '/assets/images/tutoscards/pensando.png',
    },
    {
      presentation:
        'Graças ao seu dev ele pensou nisso e colocou no seu sistema um meio que você pode sim fazer isso sem manja nada de programação :D Apresento o sistema de edição de cores lindo de bonito e maravigolds',
      why2: 'Então agora seu site possui uma tela apenas para selecionar as cores do layout do seu site, voce seleciona o que quer mudar',
      // why2:'Por que colocar isso? ACESSIBILIDADE, hoje em dia é dificil vocë nao trabalhar com isso, voce precisa solucionar problemas diariamente meu querido, problemas de pessoas reais e projetos reais e se voce consegue converter esses problemas em solução e depois em codigo mermao, se n fica sem trampo entao treina isso sempre',
      // here2:'Então bora ve como implementar esse color picker.'
    },
    {
      final:
        'Então agora temos nosso button já com as devidas cores inseridas e caso o cliente queira alternar entre os temas é so clicar no button',
      howto: 'E como que nois faz isso ae?',
      text1:
        'Continua clicando no next ali q se vai aprende hj como fazer isso aí e algumas dicas a mais.',
    },
    {
      final:
        'Então agora se vai ve como é simples 1° crie um component para seu formulário ~ng g c colopickerexample, instale as dependencias do ngx colors ~',
      imgEx: '/assets/images/tutoscards/pickerimgs/1.png',
      text1:
        'Pode ser que de um erro para instalar a dependencia angular animations, se tiver algum erro deste tipo:',
      imgEx1: '/assets/images/tutoscards/pickerimgs/2.png',
      text2:
        'Eu resolvi assim esse b.ozinho $ npm config set legacy-peer-deps true (O MEU FOI RESOLVIDO ASSIM SE DER ALGUM DIFERENTE AI FUDEU MANDA DM Q EU VEJO OQ FAÇO POR VC) Clica ali no next bb',
    },
    {
      final:
        'Show de bola agora no seu component precisamos importar os modulos para funcionar essa geringonça ai',
      imgEx: '/assets/images/tutoscards/pickerimgs/4.png',
      text1:
        'No seu HTML e no TS vamo deixa assim ó',
      imgEx1: '/assets/images/tutoscards/pickerimgs/6.png',
      imgEx2:'/assets/images/tutoscards/pickerimgs/7.png',
      imgEx4:'/assets/images/tutoscards/pickerimgs/9.png',
      text2:
        'Então vamo lá ate agora a gente instalou as dependencias, importamos o modulo NO COMPONENTE QUE VAI SER USADO O NGX COLORS, tacamo os elementos em seus devidos lugares no HTML, criamos duas variaveis a selectedTheme e isDarkMode e uma função toggleTheme()**, também criamos um objeto chamado theme, repare que após os ":" temos um Theme com a unica diferença do T maiúsculo, oq q é essa disgraçan?? Clica lá',
      explain:'** SelectedTheme vai ser o tema selecionado ou seja dentro da nossa interface temos o que? dark e light entáo ele vai alternar entre esses dois objetos, o toggle é reponsavel por mudar nosso button dark e light  e o objeto que será inserido os valores this.selectedTheme ... === "light" ? "dark" : "light", ou seja começa no light e muda para dark entao se estiver no light > adicione valores as propriedades do light e vice-versa '
    },
    {
      final:
        'O nome disso é interface basicamente interface é como se fosse um contrato entre o programador e a maquina. Veja como deve parecer a nossa interface lembrando que o nome ExampleInterface é ficticio se voce for seguir esse projeto o nome ali na linha 1 export tananan deve ser Theme',
      imgEx: '/assets/images/tutoscards/pickerimgs/10.png',
      text1:
        'então, a interface é tipo uma receita dos ingredientes do bolo, ali vão os itens mas não vão dizer exatamente como tem q ser cada coisa sacou?é uma promessa que você faz pro computador, que diz assim: "Ó, meu amigo, qualquer classe que quiser ser do tipo dessa interface, ela tem que ter essas paradas aqui dentro, beleza?" Você pode declarar ela no seu arquivo Typescript direto, ou criar um arquivo para a interface, o que deixa seu codigo mais clean e de fácil manutenção, voce so precisa criar uma pasta pra deixa tudo no seu devido lugar, e na pasta vc cria um arquivo por Ex: "facezinha.ts" isso é pra quando você vai precisar reutilizar essa interface ao longo da sua aplicação!',
      text2:'Então fecho agora que a gente já tem nossa interface, vamos importar mais algumas coisas no nosso component colorpickerexample, o import exampleinterface deve ser o nome no qual esta na linha export do arquivo interface.ts',
      imgEx3: '/assets/images/tutoscards/pickerimgs/11.png',
      imgEx2:'',
      
    },
    {
      final:
        'Então agora vamos ter alguns imports a mais do angular e um outro ali bem esquisito o matslidetoggle, esse ae é so pra gente usar o button do dark/light bem simplão, mas você vai precisar instalar o angular material então entra na documentação ai e faz oq tem q fazer bjo',
      text1:
        'então, lembra que a gente criou aquela function toggleTheme(){...} variaveis e tudo mais ? poise agora é hora da gente chamar todo mundo que está no typescript no html e ver a magica acontecer',
      text2:'Se você fez tudo certinho até aqui quando você colocar esses dados no seu html nao e pra da erro',
      imgEx3: '/assets/images/tutoscards/pickerimgs/12.png',
    },
    {
      final:
        'E o resultado final deve se parecer com isso aqui',
        imgEx: '/assets/images/tutoscards/pickerimgs/13.png',
      text1:
        'Se não deu certo pode ser que eu tenha me equivocado mas eu testei algumas vezes e deu certo ta? tenta ai dnv até dar boa.',
      consideration:'Se você entendeu o que a gente fez aq eu ficaria mto grato se você pudesse compartilhar que ta aprendendo cmg la no linkedin, da uma forcinha pro pai pq da um trabalhinho faze isso hahhah bjo querido(a)s até a prox',
    },
  ];

  genContent() {
    if (this.index < this.texts.length - 1) {
      this.index++;
    }
  }

  backContent() {
    if (this.index > 0) {
      this.index--;
    }
  }

  theme: Theme = {
    light: {
      '--nav-color': '#bbdefb',
      '--text-color': '#37474f',
      '--bg-color': '#9fa8da',
      '--footer-color': 'rgb(144, 164, 174)',
      '--buttons-color':'#bdbdbd',
      '--navbar-height': '50px',
      '--footer-height': '140px',
    },
    dark: {
      '--nav-color': 'rgb(25, 118, 210)',
      '--text-color': '#f5f5f5',
      '--bg-color': '#37474f',
      '--footer-color': '#4db6ac',
      '--buttons-color':'#9fa8da',
      '--navbar-height': '50px',
      '--footer-height': '140px',
    },
  };

  constructor() {
    this.addColors();
  }

  addColors() {
    this.colors.push(this.theme);
    console.log('cores atuais', this.colors);
    if (this.index < this.texts.length - 1) {
      this.index++;
    }
  }
}
