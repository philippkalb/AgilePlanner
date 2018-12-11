import Reflux from 'reflux';
import { UpdateTeamMembersList } from './../actions'


export class TeammembersStore extends Reflux.Store {
    constructor() {
        super();
        this.state = { team: null }; // <- set store's default state much like in React
        this.listenTo(UpdateTeamMembersList, this.onTeamUpdate); // listen to the statu        
       }

    onLoadCompleted(data) {
        // use the data here
    }

    onLoadFailed(message) {
        // failed, with whatever message you sent
    }

    onTeamUpdate() {
       fetch('api/Team/')
            .then(response => response.json())
            .then(data => {
                this.setState({ team: data, loading: false });
            });
    }
}