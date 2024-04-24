import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { NavbarComponent } from "../../navbar/navbar.component";


interface Inputs {
  input1: string;
  input2: string;
}

@Component({
    selector: 'app-fire-form',
    standalone: true,
    templateUrl: './fire-form.component.html',
    styleUrl: './fire-form.component.css',
    imports: [CommonModule, FormsModule, MatIcon, NavbarComponent]
})
export class FireFormComponent  {
  inputs : Inputs = {input1: '', input2 : ''};

  formSubmitted : boolean = false;


  onSubmit() {
    this.inputs.input1 = this.inputs.input1;
    this.inputs.input2 = this.inputs.input2;
    this.formSubmitted = true;
  }

 hTDIndex = 0;
  howTodo = [
    {text: 'É bem simples, utilizando o que o angularFire já nos da di Free.'},
    {text: 'Vou assumir que você já tem o firebase integrado ao seu projeto oskey.'},
    {text: 'Primeiro, voce vai fazer a estrutura do HTML, que é simplão. algo marromenos assim :',
      aaa: `
      <form (ngSubmit)="onSubmit()">
      <div class="box">
          <div class="title mt-4">
              <h3>FireForm</h3>
          </div>
          <div class="explanation mt-4">
              <p>Este formulário irá en viar os dados recebidos dentro dos campos abaixo para o banco de dados do
                  firebase</p>
          </div>
          <div class="inputs mt-4">
              <label for="input1" class="mt-2">1° campo</label>
              <input name="input1" [(ngModel)]="inputs.input1" type="text" class="mt-2" placeholder="Digite pfv">
              <label for="input2" class="mt-2">2° campo</label>
              <input name="input2" [(ngModel)]="inputs.input2" type="text" class="mt-2" placeholder="Digite pfv">
          </div>
      </div>
      <div class="btn mt-2">
          <button type="submit">Enviar</button>
      </div>
      </form>
      `
    },
    {text: `Nesse formulário, temos, a tag <form>, com a função, onSubmit(), temos dois inputs também, utilizamos nos inputs o [(ngModel)],
    com um valor 'inputs.input1 e inputs.input2', que será nossa variavel que vai receber os valores.
    `},
    {
      text: `Entao agora que definimos, nossa estrutura no template devemos começar a implementar a conexao com o banco de dados.
      vamos entao começar do basics.
      Vamos criar uma interface para termos nosso 'contrato'.
      E vamos criar a variavel para nossos inputs que estão enviando os dados, o nome dessa variável vai ser 'inputs'
      `,
      aaa: `
      
      Variavel >> inputs : Inputs = {input1: '', input2 : ''}; 
      
      interface >> 
        interface Inputs {
        input1: string;
        input2: string;
      }
      `
    },
    {
      text: `Agora devemos fazer a função onSubmit() enviar nosso formulário. E importar o angular firestore e declara-lo no constructor`,
      aaa: `
      constructor(private angularFirestore : AngularFirestore){}//
      função onsubmit >>
      async onSubmit(){
          try{
            await this.firestore.collection('formLesson').add({
              text1: this.inputs.input1,
              text2: this.inputs.input2,
            });
            console.log('Deu td certo xD');
          } catch(error){
            console.log('Deu tudo errado :(', error)
          }
        }`,
    },
    {
      text: `Perfeito agora temos nosso formulário enviando nossos dados quando submetido, mas como isso é feito?`,
      aaa: `Repare que ao declararmos o angular firestore no constructor, chamamos o uma função do angularFire, a "collection"
      Basicamente o que está acontecendo ali, quando a função onSubmit e chamada, essa função vai passar pelo angularFirestore, vai usar a função
      collection, vai buscar pelo parametro ('formLesson'), o que é isso? o parametro é o caminho no qual o nosso formulário vai inserir os dados dos inputs.
      Ou seja, no seu banco de dados fireStorage, essa função vai adicionar os valores inseridos no caminho/pasta/path enfim como melhor entender,
      dentro da collection 'formLesson', esse valor pode ser qualquer um que você desejar inserir, porém ele vai ser usado para retornar os dados nele inseridos posteriormente.
      `
    },
    {text: `Perfeito agora que nosso formulário já esta comunicando com nosso banco de dados, geralmente dependendo do uso, você pode querer fazer 
    um Fetch(Retornar os dados no template). E para fazer isso também é muito simples, vamos utilizar mais uma variável para que seja populada com esses dados.
    Chamaremos ela de 'Bindis', vamos também criar uma interface para ela para sabermos exatamente quais dados irão chegar nela:`,
    aaa: `interface Bindis{text1: string; text2: string;}, variável >>>   bindi : Bindis[]=[];
    `
  },
  {
    text:`Então agora devemos criar um meio que irá popular essa variável, dentro do seu constructor coloque o seguinte trecho: `,
    aaa: `
    constructor(private firestore: AngularFirestore) {
      this.bindi = this.firestore.collection('formLesson').valueChanges().pipe(
        map((data: any[]) => {
          return data.map(doc => {
            const { text1, text2 } = doc;
            return { text1, text2 } as Bindis;
          });
        })
      );
    }
  `
  },
  {
    text: `Então deixa o pai explicar pra vcs aq oq acontece, Aqui, this.firestore.collection('formLesson') 
    é uma chamada para obter a coleção 'formLesson' do Firestore. valueChanges() é um método que retorna um Observable
    que emite os dados da coleção sempre que houver uma mudança. Um Observable é como se fosse aquela tiazinha que fica
    fazendo papel de camera da quebrada, tendeu? Então toda vez que alguma coisa diferente acontece, qq a tiazinha faz? 
    Ela faz fofoca kk, da pra dizer que o observable é isso um fofoqueiro, entao toda nova informação que chegar o observable vai emitir ela.`,
    aaa: `Vamo ter também o MAP ali, qq é isso? Basicamente é como se fosse uma oficina irmão pensa assim, a gente pega algumas peças de um carro,
    essas peças ai são o "doc", então vamos supor que o teu carro precisa das peças text1 e text2, mas na sua mesa vamos dizer que chegaram as peças,
    text1, text3, text2, text6, text7, o trabalho do map ai é ver as peças que chegaram e separar somente aquelas que vão ser usadas, no nosso caso,
    text1 e text2, então ele separa e manda bonitinho pro mano que no caso é o bindi, o bindi é quem monta o carro kk, então agora que o bindi,
    tem as peças certas, ele so precisa saber aonde ele vai colocar essas peças.`
  },
  {
    text: `No nosso caso ele vai colocar as peças no html, então ele vai precisar de alguma informação pra isso correto? e aqui vai ela: `,
    aaa: `
    <div class="binds mt-4" *ngFor="let lesson of bindi | async">
    <p>text1: {{lesson.text1}}</p>
    <p>text2: {{lesson.text2}}</p>
    </div>
    `
  },
  {
    text : `no angular para fazer essas chamadas da pra utilizar o *ngFor, perceba que então depois de separar as peças, e manda pro outro mecanico(bindi) montar elas,
    agora a gente precisa mostrar essas peças no carro certo? Então é isso que ta acontecendo ali, o ngfor vai acessar nossa variavel bindi,
    no elemento <p>, vai buscar por text1 ou text2, e quando achar ele vai mostrar tipo ó ta aq tuas peçãs novas bro, no caso o text1 e text2
    na linguagem mais tech vamos renderizar o que tem dentro da variavel bindi. Entao agora toda vez que alguma peça nova chegar, do nosso fornecedor
    que é o formulário ela vai passar pelo observable, ele vai avisar o map que chego X coisas, o map vai pegar somente oq precisa naquele momento 
    e o bindi vai montar essas peças e depois vai mostrar elas montadas no HTML.`,
    aaa: 'Basicamente é isso time agora vc tem um meio de guardar informações dinamicamente no seu banco de dados <3',
  }

  ]
  nextLesson(){
    this.hTDIndex++;

  }
  prevLesson(){
    this.hTDIndex--;
  }
 

}
