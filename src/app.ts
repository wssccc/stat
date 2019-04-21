"use strict";
import './app.css'
import {load} from './js/utils'
import {$} from './js/global'
import {Heatmap} from './js/Heatmap'
import {Kline} from './js/Kline'

$(function () {
  load(function (data) {
    new Kline(data).init($("#chart")[0]);
    new Heatmap(data).init($("#heat-map")[0])
  });
});
