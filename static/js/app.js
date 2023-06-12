// Get the Samples endpoint
const Samples = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init(){

  // this checks that our initial function runs.
  console.log("The Init() function ran")

  // create dropdown/select
  d3.json(Samples).then(i => {
    let ids = i.names
    // Get the dropdown/select element
    let dropdownMenu = d3.select("#selDataset")
    .selectAll("option")
    .data(ids)
    .enter()
    .append("option")
    .attr("value", d => d)
    .text(d =>  d);
  });

  // run functions to generate plots with default id = 940
  createScatter('940')
  createBar('940')
  createSummary('940')
  createGauge('940')
};

// function that runs whenever the dropdown is changed
// this function is in the HTML and is called with an input called 'this.value'
// that comes from the select element (dropdown)
function optionChanged(newID){
  // code that updates graphics
  // one way is to recall each function
  createScatter(newID)
  createBar(newID)
  createSummary(newID)
  createGauge(newID)
};


function createScatter(id){
  // code that makes scatter plot at id='bubble'
  d3.json(Samples).then(data => {
    let sampleData = data.samples.find(sample => sample.id === id);
    let sample_values = sampleData.sample_values;
    let otu_ids = sampleData.otu_ids;
    let otu_labels = sampleData.otu_labels;
    let trace = {
     x: otu_ids,
     y: sample_values,
     text: otu_labels,
     mode: "markers",
     marker:{
        size:sample_values,
        color: otu_ids,
        colorscale: "Earth" 
     }
   };
    let plotData = [trace];
    let layout = {
        height:550,
        width:1200
    };

    Plotly.newPlot("bubble", plotData, layout);
 })  
  // checking to see if function is running
  console.log(`This function generates scatter plot of ${id} `)
}

function createBar(id){
  // code that makes bar chart at id='bar'
  d3.json(Samples).then(data => {
    let sampleData = data.samples.find(sample => sample.id === id);
    let sample_values = sampleData.sample_values.slice(0, 10).reverse();
    let otu_ids = sampleData.otu_ids.slice(0, 10).reverse();
    let otu_labels = sampleData.otu_labels.slice(0, 10).reverse();
    let trace = {
     x: sample_values,
     y: otu_ids.map(id => `OTU ${id}`),
     type: 'bar',
     text: otu_labels,
     orientation: 'h'
   };
    let plotData = [trace];
    let layout ={margin: {
     l: 100,
     r: 100,
     t: 0,
     b: 100
   }
    };
    Plotly.newPlot("bar", plotData,layout);
 })
  // checking to see if function is running
  console.log(`This function generates bar chart of ${id} `)

}

function createSummary(id){
  // code that makes list, paragraph, text/linebreaks at id='sample-meta'
  d3.json(Samples).then(data => {
  let sampleData = data.metadata.find(sample => sample.id == id);
    let info = d3.select(".panel-body");
    // remove previous info
    info.html("");
    // append new info for selected id
    info.append("p").text(`id: ${sampleData.id }`);
    info.append("p").text(`ethnicity : ${sampleData.ethnicity }`);
    info.append("p").text(`gender : ${sampleData.gender }`);
    info.append("p").text(`age: ${sampleData.age }`);
    info.append("p").text(`location: ${sampleData.location }`);
    info.append("p").text(`bbtype : ${sampleData.bbtype }`);
    info.append("p").text(`wfreq: ${sampleData.wfreq }`);
 })
  // checking to see if function is running
  console.log(`This function generates summary info of ${id} `)
}

function createGauge(id){
  // code that makes gauge chart at id='gauge'
  d3.json(Samples).then(data => {
  let sampleData = data.metadata.find(sample => sample.id == id);
  let gaugeData = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      title: { text: "Belly Button Washing Frequency<br>Scrubs per Week" },
      type: "indicator",
      mode: "gauge+marker",
      gauge: {
        axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 1], color: "rgb(255,255,217)", text: "0-1" },
          { range: [1, 2], color: "rgb(237,248,217)", text: "1-2" },
          { range: [2, 3], color: "rgb(199,233,180)", text: "2-3" },
          { range: [3, 4], color: "rgb(127,205,187)", text: "3-4" },
          { range: [4, 5], color: "rgb(65,182,196)", text: "4-5" },
          { range: [5, 6], color: "rgb(29,145,192)", text: "5-6" },
          { range: [6, 7], color: "rgb(34,94,168)", text: "6-7" },
          { range: [7, 8], color: "rgb(37,52,148)", text: "7-8" },
          { range: [8, 9], color: "rgb(8,29,88)", text: "8-9" }
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: sampleData.wfreq
        },
        // Add marker to display indicator
        marker: {
          size: 50,
          color: "red"
        }
      }
    }
  ];

  let layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };
  Plotly.newPlot("gauge", gaugeData, layout)
});


// checking to see if function is running
console.log(`This function gauge chart of ${id}`);
};


// function called, runs init instructions
// runs only on load and refresh of browser page
init();