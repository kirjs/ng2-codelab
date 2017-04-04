export class ContextService {
  getAdText(description: string) {
    // Super secret algorithm, please don't share outside of this course.
    return description.indexOf('music') >= 0 ?
      polyglot.t('Buy awesome speakers on our web site.') :
      polyglot.t('Check out our web site');
  }
}
