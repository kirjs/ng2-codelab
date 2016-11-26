export class ContextService {
  getAddText(description) {
    // I know!
    return description.indexOf('music') >= 0 ?
      'Buy awesome speakers on our web site.' :
      'Check out our web site';
  }
}
