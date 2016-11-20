import './Bootstrap';

describe('Component', () => {
  it('This should be pretty straightforard', () => {
    window.setTimeout(()=>{
      console.log(document.body)
    }, 500);
  });

});

