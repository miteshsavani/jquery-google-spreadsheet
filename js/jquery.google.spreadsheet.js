// jquery.google.spreadsheet.js
// version : 0.0.1
// author : Queli Coto (quelicm@gmail.com)
// license : MIT
// http://quelicoto.es
var GoogleSpreadsheet = (function($) {
  var googleUrl = {};
  function GoogleSpreadsheet() {
  }

  GoogleSpreadsheet.prototype.getGoogleUrl = function() {
    return googleUrl;
  };
 GoogleSpreadsheet.prototype.url = function(url) {
    googleUrl = this.getGoogleUrl();
    googleUrl.sourceIdentifier = url;
    if (googleUrl.sourceIdentifier.match(/http(s)*:/)) {
      googleUrl.url = googleUrl.sourceIdentifier;
      try {
        googleUrl.key = googleUrl.url.match(/key=(.*?)&/)[1];
      } catch (error) {
        googleUrl.key = googleUrl.url.match(/(cells|list)\/(.*?)\//)[2];
      }
      try {
        googleUrl.gid = googleUrl.url.match(/gid=(.?)/)[1];
        if(googleUrl.gid!=='0'){
          var num = 6 + parseInt(googleUrl.gid,10);
          googleUrl.gid = 'od'+num.toString();
        } else {
          googleUrl.gid = 'od6';
        }
      } catch (error) {
        googleUrl.gid = 'od6';
      }

    } else {
      googleUrl.key = googleUrl.sourceIdentifier;
    }
    googleUrl.jsonCellsUrl = 'http://spreadsheets.google.com/feeds/cells/' + googleUrl.key + '/' + googleUrl.gid + '/public/basic?alt=json-in-script';
    googleUrl.jsonListUrl = 'http://spreadsheets.google.com/feeds/list/' + googleUrl.key + '/' + googleUrl.gid + '/public/basic?alt=json-in-script';
  };
  GoogleSpreadsheet.prototype.load = function() {
    var param = arguments;
    if(param.length > 1 && param[0]==='cell'){
      $.when( this.loadCells() ).then( function( data ){
        return param[1](data);
      });
    } else {
       $.when( this.loadList() ).then( function( data ){
        return param[0](data);
      });
    }
  };


  GoogleSpreadsheet.prototype.loadCells = function(url) {
    googleUrl = this.getGoogleUrl();
    return $.Deferred(function (d) {
        url = googleUrl.jsonCellsUrl + '&callback=?';
        $.getJSON(url, function(data) {
         var dataContent = GoogleSpreadsheet.loadDataCells(data);
         d.resolve(dataContent);
        });
    });
  };

  GoogleSpreadsheet.loadDataCells = function(data) {
    var cell;
      var _i, _len, _ref, _results;
      _ref = data.feed.entry;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cell = _ref[_i];
        var contentCell = cell.content.$t;
        _results.push(cell.content.$t);
      }
      return _results;
  };

  GoogleSpreadsheet.prototype.loadList = function(url) {
    googleUrl = this.getGoogleUrl();
      return $.Deferred(function (d) {
      url = googleUrl.jsonListUrl + '&callback=?';
      $.getJSON(url, function(data) {
       var dataContent = GoogleSpreadsheet.loadDataList(data);
       d.resolve(dataContent);
      });
    });
  };

  GoogleSpreadsheet.loadDataList = function(data) {
    var cell, googleSpreadsheet, googleUrl;
      var _i, _len, _ref, _results;
      _ref = data.feed.entry;
      _results = {};
       _results['items'] = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cell = _ref[_i];
        var contentCell = cell.content.$t;
        var titleCell = cell.title.$t;
        var n=contentCell.split(', ');
        var item = { 'id' : titleCell};
        for (var i = 0; i < n.length; i++){
          var aData = n[i].split(': ');
          item[aData[0]] = $.trim(aData[1]);
        }
        _results.items.push(item);
      }
      return _results;
  };

  return GoogleSpreadsheet;
})(jQuery);