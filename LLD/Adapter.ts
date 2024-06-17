class Soldier {
    level;
    constructor(level) {
        this.level = level;
    }

    attack() {
        return this.level * 1;
    }
}

class Jedi {
    level;
    constructor(level) {
        this.level = level;
    }

    attackWithSaber() {
        return this.level * 100;
    }
}

class JediAdapter {
    jedi;
    constructor(jedi) {
        this.jedi = jedi;
    }

    attack() {
        return this.jedi.attackWithSaber();
    }
}

export {
    Soldier,
    Jedi,
    JediAdapter
};