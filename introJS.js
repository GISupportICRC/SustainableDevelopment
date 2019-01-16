function startIntro(){
  introJs().setOptions({
    steps: [
      {
        intro: 'Click on location pins to display information about sustainability projects.'
      },
      {
        element: document.querySelector('#addProjectButton'),
        intro: 'You can contribute to the Sustainable Development in Humanitarian Action Atlas. Add a sustainability project by filling a short survey. Your project will appear on the map after submitting your answers.',
        position: 'top'
      },
      {
        element: document.querySelector('#dijit__WidgetBase_2'),
        intro: 'The sustainability initiatives are colour coded by themes: social (yellow), environmental (green), economic (blue).',
        position: 'bottom'
      },
      {
        element: document.querySelector('#dijit__WidgetBase_4'),
        intro: 'The filter widget allows you to browse through sustainability projects by theme, region, country and year.  Slide the button to the right to activate the filter.',
        position: 'right'
      },
      {
        intro: 'That\'s all, happy exploring!'
      }
      ]
    }).start();

    document.querySelector('.introjs-helperNumberLayer').style.backgroundImage = 'linear-gradient(rgba(16, 125, 148, 0.3) 0px, rgba(16, 125, 148, 0.3) 100%)';
    document.querySelector('.introjs-helperNumberLayer').style.color = 'rgb(255, 255, 255)';
    document.querySelector('.introjs-helperNumberLayer').style.border = '1.5px solid rgb(16, 125, 148)';
  }