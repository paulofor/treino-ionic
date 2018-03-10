import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Dish } from '../../shared/dish';
import { Promocao } from '../../shared/promocao';
import { Leader } from '../../shared/leader';

import { DishProvider } from '../../providers/dish/dish';
import { PromocaoProvider } from '../../providers/promocao/promocao';
import { LeaderProvider } from '../../providers/leader/leader';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {


  prato: Dish;
  promocao: Promocao;
  leader: Leader;
  dishErrMsg: string;
  promoErrMsg: string;
  leaderErrMsg: string;

  constructor(public navCtrl: NavController,
    private dishSrv: DishProvider, private promocaoSrv: PromocaoProvider,
    private leaderSrv: LeaderProvider, @Inject('BaseURL') private BaseURL) {

  }

  ngOnInit() {
    this.dishSrv.getFeaturedDish()
      .subscribe(dish => this.prato = dish,
        errMsg => this.dishErrMsg = <any>errMsg);
    this.leaderSrv.getFeaturedLeader()
      .subscribe(item => this.leader = item,
        errMsg => this.leaderErrMsg = <any>errMsg);
    this.promocaoSrv.getFeaturedPromocao()
      .subscribe(item => this.promocao = item,
        errMsg => this.dishErrMsg = <any>errMsg);
  }

}
