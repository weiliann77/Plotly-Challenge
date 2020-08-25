const url = "samples.json";

// Fetch the JSON data and console log it


function BarPlot1() { 
d3.json(url).then(function(data) {
console.log(data);
var sub1 = data.samples;
//console.log(sub1);
var sub2 = sub1[0];
var sub3 = Object.values(sub2);
console.log(sub2);
var sort1 = sub3.sort((a,b) => b[1] - a[1]);
console.log(sub3);

var num_slice1 = sort1[1].slice(0,10);
var name_slice1 = sort1[0].slice(0,10);
var name_slice2 = sort1[3].slice(0,10);
var name_slice3 = [];
var family_name = [];
for (let i = 0; i<9; i++) {

family_name[i] = getFamily(name_slice2[i]);
name_slice3[i]= name_slice1[i] +': ' + family_name[i];
};

//console.log(unpack1(sub1));
//console.log(unpack2(sub1));
r_num = num_slice1.reverse();
r_name = name_slice3.reverse();
console.log(family_name);


var trace1 = {
    y: r_name,
    x: r_num,
    orientation: "h",
    type: "bar"

  };
  
  var data = [trace1];

  // Apply the group bar mode to the layout
  var layout = {
    title: "Top 10 Bacteria - Selected Subject",
    margin: {
      l: 50,
      r: 50,
      t: 50,
      b: 50
    },
    yaxis: {
      automargin:true,
    }

  };
  
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar1", data, layout);




});


};

function BarPlot2() { 
  d3.json(url).then(function(data) {
  
  var sub1 = data.samples;
  var r_name1 = unpack2(sub1);
  var r_num1  = unpack1(sub1);

  var unique = [...new Set(r_name1)];
  var unique_val =[];  
  console.log(unique);


  for(x=0; x<unique.length;x++){
      unique_val[x]=0;
    };
  for(x=0; x<unique.length;x++){
  for(y=0;y<r_name1.length;y++){
    if (parseInt(unique[x])===parseInt(r_name1[y])){
      unique_val[x]=parseInt(unique_val[x])+parseInt(r_num1[y]);
    };
    };
  } ; 


  var list =  [];

for (var j = 0; j < unique.length; j++) 
    list.push({'name': unique[j], 'value': unique_val[j]});



var list2 = list.sort((a,b) => b.value- a.value);


console.log(list2);
  
var names =[];
var values = [];

for (var k = 0; k < list2.length; k++) {
  names[k] = " :" +list2[k].name;
  values[k] = list2[k].value;
};

var num_slice1 = values.slice(0,10);
var name_slice1 = names.slice(0,10);
r_num = num_slice1.reverse();
r_name = name_slice1.reverse();

  var trace1 = {
      y: r_name,
      x: r_num,
      orientation: "h",
      type: "bar"
  
    };
    
    var data = [trace1];
  
    // Apply the group bar mode to the layout
    var layout = {
      title: "Top 10 Bacteria - All Subjects",
      margin: {
        l: 50,
        r: 50,
        t: 50,
        b: 50
      },
      yaxis: {
        automargin:true,
      }
  
    };
    
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar2", data, layout);
  });
  
  };
  





function getFamily(str) {
 // console.log(str);
  var len = str.split(';').length;
  return str.split(';')[len-1];
};
  



 function unpack1(arr) {
 var new_arr =[];
 var short_arr =[];
   for (let i = 0; i<arr.length; i++) {
     short_arr = arr[i];
     shorty_arr = short_arr.sample_values;
   for (let v = 0; v<shorty_arr.length; v++) { 
     new_arr.push(shorty_arr[v]);
   };
   };
   return new_arr;
 };


 function unpack2(arr) {
  var new_arr =[];
  var short_arr =[];
    for (let i = 0; i<arr.length; i++) {
      short_arr = arr[i];
      shorty_arr = short_arr.otu_ids;
    for (let v = 0; v<shorty_arr.length; v++) { 
      new_arr.push(shorty_arr[v]);
    };
    };
    return new_arr;
  };
 

BarPlot1();
BarPlot2();