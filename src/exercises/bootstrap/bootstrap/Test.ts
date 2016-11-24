describe('Component', () => {
  it('This should be pretty straightforard', () => {

    chai.expect((window.parent.document.body.querySelector('iframe.preview') as HTMLIFrameElement).contentDocument.body.innerHTML).contains('Hello')
  });
});

