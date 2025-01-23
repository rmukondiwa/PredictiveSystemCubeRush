exports.calculateMatch = (prefsA, prefsB) => {
    const commonInterests = prefsA.interests.filter(interest => prefsB.interests.includes(interest));
    return commonInterests.length * 10; // Each shared interest adds 10 points
};