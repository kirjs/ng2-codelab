function diff(file, commits: string[]) {

}

diff(`
I'm always here
/* <diff from = "first"> */First /*</diff>*/

`, ['first', 'second', 'third']);
