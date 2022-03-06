//Just taking code from Zeniku
function SeekerBulletType(object){
  if(object == undefined) object = {}
  object = Object.assign({
	  damage: 25,
	  trailColor: Pal.lancerLaser,
	  trailWidth: 1,
	  trailLength: 15,
	  turningPower: 10,
	  speed: 3,
	  pierce: true,
	  pierceCap: 10,
	  homeStop: false,
	  targetTime: 15,
	  hitEffect: Fx.hitLancer,
	  despawnEffect: Fx.hitLancer,
	  customTrail: false,
    customTrailST: 0,
    customTrailEffect: Fx.none,
	  init(b){
	    if(!b) return;
	    b.data = {}
	    if(!this.customTrail){
	      b.data.trail = new Trail(this.trailLength);
	    }
	    b.data.home = true
	  },
	  draw(b){
	    if(!this.customTrail){
	      b.data.trail.draw(this.trailColor, this.trailWidth);
	    }
	    Draw.color(this.trailColor)
	    Drawf.tri(b.x, b.y, this.trailWidth * 2, this.trailWidth * 2, b.rotation());
	  },
		update(b){
			let tx = null
			let ty = null
		  if(b.owner instanceof Unit){
		  	tx = b.owner.aimX
		    ty = b.owner.aimY
		  	}
	 	  if(b.owner instanceof Turret.TurretBuild){
		  	tx = b.owner.targetPos.x
		    ty = b.owner.targetPos.y
	    }
		  //just to double check
			if(tx != null && ty != null){
			  let ang = Angles.moveToward(b.rotation(), b.angleTo(tx, ty), this.turningPower * Time.delta * 50);
			  if(b.timer.get(0, this.targetTime)){
			    if(this.homeStop){
			      if(b.data.home){
	            b.rotation(ang)
		          b.vel.setAngle(ang);
			      }
			    }else{
			      b.rotation(ang)
			      b.vel.setAngle(ang);
			    }
			  }
			  if(b.within(tx, ty, this.hitSize / 2)){
			    if(this.homeStop){
	          b.data.home = false
			    }
			  }
			  //flib.printer(tx, ty, ang, b.data.homeCount)
		  }
		  if(!this.customTrail){
			  b.data.trail.update(b.x, b.y);
		  }else {
		    if(b.timer.get(1, this.customTrailST)) {
		      if(this.customTrailEffect != Fx.none) {
		        this.customTrailEffect.at(b.x, b.y, b.rotation())
		      }
		    }
		  }
		}
	}, object);
	return extendContent(LaserBoltBulletType, object);
};
