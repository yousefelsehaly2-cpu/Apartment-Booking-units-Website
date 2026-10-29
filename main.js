let grade = Number(prompt("Enter your grade:"));

if (grade > 100 ) {
    console.log("Invalid Grade");
}


else if (grade >= 90) {
    console.log("A");
}

else if (grade >= 80) {
    console.log("B");
}

else if (grade >= 70) {
    console.log("C");
}

else if (grade >= 60) {
    console.log("D");
}
else if (grade >= 50) {
    console.log("D-");
}
else {
    console.log("F");
}