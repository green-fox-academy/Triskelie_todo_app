
const argv = process.argv.slice(2)

const guide = `Parancssori Todo applikáció
=============================
Parancssori argumentumok:
    -l   Kilistázza a feladatokat
    -a   Új feladatot ad hozzá
    -r   Eltávolít egy feladatot
    -c   Teljesít egy feladatot`;


if (argv.length === 0) {
    console.log(guide);
}