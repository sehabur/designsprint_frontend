import { Component, OnInit, AfterViewInit } from '@angular/core';

import { YoutubePlayerWeb } from 'capacitor-youtube-player'; // Web version

import { Plugins, Capacitor } from '@capacitor/core'; // Native version

import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, AfterViewInit {

  currentYear = new Date().getFullYear();

  constructor(
    private youtube: YoutubeVideoPlayer
  ) {
  }

  openMyVideo(id){
    this.youtube.openVideo(id);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {


    if (Capacitor.platform === 'web') {

      this.initializeYoutubePlayerPluginWeb();
    } else { // Native
      this.initializeYoutubePlayerPluginNative();
    }
  }

  async initializeYoutubePlayerPluginWeb() {
    console.log('playerReady');
    const options = {playerId: 'youtube-player', playerSize: {width: 640, height: 360}, videoId: '6p2BfeDhfN8'};
    console.log(options);
    const result = await YoutubePlayerWeb.initialize(options);
    console.log(result);
 

  }

  async destroyYoutubePlayerPluginWeb() {
    const result = await YoutubePlayerWeb.destroy('youtube-player');
    console.log('destroyYoutubePlayer', result);
  }

  async initializeYoutubePlayerPluginNative() {

    const { YoutubePlayer } = Plugins;
    const result = await YoutubePlayer.echo({value: 'hola' });
    const options = {width: 640, height: 360, videoId: '6p2BfeDhfN8'};
    const playerReady = await YoutubePlayer.initialize(options);
  }

}
