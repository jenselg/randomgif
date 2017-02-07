import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { SocialSharing } from 'ionic-native';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  entries: any;
  hours: any;
  minutes: any;
  seconds: any;
  counter: any;
  colorBg: any;
  boredometer: any;

	constructor(public navCtrl: NavController, public http: Http) {
		this.entries = [];
		this.colorBg = "#b71c1c"
		this.hours = 0;
		this.minutes = 0;
		this.seconds = 0;
		this.counter = 0;
		this.boredometer = 0;

		this.startCount();
		this.loadGif();
		this.boredMeter();
	}

	boredMeter () { /* NOT IMPLEMENTED */
		var that = this;
		setInterval(function(){
			if (that.boredometer > 0) {
				that.boredometer -= 0.5; 
			}
		}, 1500);
	}

	randomBgColor() { /* NOT IMPLEMENTED */
		var colors = ['#b71c1c','#880E4F','#4A148C','#311B92','#1A237E','#0D47A1','#01579B','#006064','#004D40','#1B5E20','#33691E','#827717','#F57F17','#FF6F00','#E65100','#BF360C','#3E2723','#212121','#263238'];
	    for (var i = colors.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = colors[i];
	        colors[i] = colors[j];
	        colors[j] = temp;
	    }
		this.colorBg = colors[0];
		console.log(this.colorBg);
		return colors[0];
	}

	shareGif(image, url){
		SocialSharing.share(url, null, image, url);
	}

	startCount(){
		var that = this;
		setInterval(function(){
			if (that.seconds < 59) {
				that.seconds++;
			} else if (that.seconds == 59) {
				that.seconds = 0;
				if (that.minutes < 59) {
					that.minutes++;
				} else if (that.minutes == 59) {
					that.minutes = 0;
					that.hours++;
				}
			}
		}, 1000);
	}

	saveGif(link) {
		window.open(link, '_system', 'location=yes');
	}

	resetGif() {
		var gifArray = [];
		var imageNum = 5;
		var i;
		for (i = 1; i <= imageNum; i++) {
			this.http.get('https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC').map(res => res.json()).subscribe(
				data => {
					if (data.data.image_url.substr(data.data.image_url.length - 3) == "gif") {
						gifArray.push(data);
					}
				}
			);
			this.counter++;
			this.entries = gifArray;
		}
	}

  	loadGif() {
		var imageNum = 5;
		var i;
		for (i = 1; i <= imageNum; i++) {
			this.http.get('https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC').map(res => res.json()).subscribe(
				data => {
					if (data.data.image_url.substr(data.data.image_url.length - 3) == "gif") {
						this.entries.push(data);
						this.counter++;
					}
				}
			);
		}
  	}

  	addGif() {
		var imageNum = 1;
		var i;
		for (i = 1; i <= imageNum; i++) {
			this.http.get('https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC').map(res => res.json()).subscribe(
				data => {
					if (data.data.image_url.substr(data.data.image_url.length - 3) == "gif") {
						this.entries.push(data);
						this.counter++;
						this.boredometer += 0.5;
					}
				}
			);
		}
  	}

	doInfinite(infiniteScroll) {
		setTimeout(() => {
		  this.addGif();
		  infiniteScroll.complete();
		}, 500);
	}

	doRefresh(refresher) {
		setTimeout(() => {
		  this.resetGif();
		  refresher.complete();
		}, 2000);
	}

}
