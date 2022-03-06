//hehe stea- borrowing from Zeniku
//Detects enemy units in a radius
function radiusEnemies(team, x, y, radius, func){
	return Units.nearbyEnemies(team, x - radius, y - radius, radius * 2, radius * 2, u => {
		if(u.within(x, y, radius)){
			func(u)
		};  
	});
}; 
/*
Credits to Zeniku/HeavyMachinery
*/
module.exports = {
  radiusEnemies
}
