import {$, env} from './global'
import staticdata from '../../data'

export function dateFormat(date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

export function interpolation(data) {
  let result = [];
  data = data.map((item) => {
    let strs = item.filter(v => typeof v === 'string');
    let vals = item.filter(v => typeof v === 'number');
    while (strs.length < 2) {
      strs.push(undefined);
    }
    while (vals.length < 2) {
      vals.push(vals[vals.length - 1]);
    }
    return [new Date(strs[0]).getTime(), strs[1], vals[0], vals[1]];
  })
  let pre = null;
  data.forEach(item => {
    if (pre) {
      let right = item[0];
      let left = pre[0];
      for (let k = left; k < right; k += 86400 * 1000) {
        result.push([
          dateFormat(new Date(k)),
          k,
          (k === left ? pre[1] : undefined),
          pre[2],
          pre[3]
        ]);
      }
    }
    pre = item;
  })
  const last = data.length - 1;
  result.push([dateFormat(new Date(data[last][0])), data[last][0], data[last][1], data[last][2], data[last][3]]);
  //init progress
  let progress = parseFloat(((80 - data[last][2]) / 15 * 100).toFixed(1));
  $('#progress-container').fadeIn();
  setTimeout(() => {
    $('#progress')
      .attr('aria-valuenow', progress)
      .css('width', progress + '%')
      .text(progress + '%');
  }, 0);
  return result;
}

export function load(callback) {
  if (env === 'development') {
    callback(interpolation(staticdata));
  } else {
    fetch('../data.json?_=' + Math.random()).then(res => res.json()).then(data => {
      callback(interpolation(data));
    });
  }
}
