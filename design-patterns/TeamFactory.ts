class Players {
    name: string;
    age: number;
}

class Team {
    players: Players[];
}

class TeamFactory {
    createTeam(players: Players[]): Team {
        return new Team();
    }
    createPlayer(name: string, age: number): Players {
        return new Players();
    }
    addPlayer(team: Team, player: Players): void {
        team.players.push(player);
    }
    removePlayer(team: Team, player: Players): void {
        team.players.splice(team.players.indexOf(player), 1);
    }
    printTeam(team: Team): void {
        console.log(team);
    }
    printPlayer(player: Players): void {
        console.log(player);
    }
    private static instance: TeamFactory;
    static getInstance(): TeamFactory {
        if (!TeamFactory.instance) {
            TeamFactory.instance = new TeamFactory();
        }
        return TeamFactory.instance;
    }
}