USE dnd_database;
insert into races (races.name,str_bonus,dex_bonus,con_bonus,int_bonus,wis_bonus,cha_bonus,createdAt,updatedAt) values
("Human",1,1,1,1,1,1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
("Dwarf",2,0,2,0,0,0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
("Elf",0,2,0,1,0,0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
("Halfling",0,2,0,0,0,0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
insert into classes (classes.name, classes.desc, createdAt, updatedAt) values
("Fighter","A versatile warrior",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
("Wizard", "A versatile spellcaster",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
("Cleric", "A battle healer",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
("Ranger", "A ranged combat specialist",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO spells (spells.name,spells.desc,school,dmg_slot_1,dmg_slot_2,dmg_slot_3,dmg_slot_4,dmg_slot_5,dmg_slot_6,dmg_slot_7,dmg_slot_8,dmg_slot_9,createdAt,updatedAt)
VALUES
("Magic Missile","a magic spell","evocation","3d4","4d4","5d4","6d4","7d4","8d4","9d4","10d4","11d4",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
("Cone of Cold","a cold spell","evocation",null,null,null,null,"8d8","9d8","10d8","11d8","12d8",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
("Cure Wounds","a healing spell","evocation","1d8","2d8","3d8","4d8","5d8","6d8","7d8","8d8","9d8",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
("Fireball","a fire spell","evocation",null,null,"8d6","9d6","10d6","11d6","12d6","13d6","14d6",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
("Flame Strike","a big fire spell","evocation",null,null,null,null,"4d6 + 4d6","4d6 + 5d6","4d6 + 6d6","4d6 + 7d6","4d6 + 8d6",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
insert into classspells (ClassId,SpellId,createdAt,updatedAt) values
(3,1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
(3,3,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
(4,4,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
(1,4,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
(4,5,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
(3,5,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
INSERT INTO weapons (`name`,`category`,`1h_dmg`,`2h_dmg`,`range`,`createdAt`,`updatedAt`) VALUES
("Club","simple","1d4",null,5,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
("Shortbow","simple",null,"1d6",80,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
("Quarterstaff","simple","1d6","1d8",5,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
("Warhammer","martial","1d8","1d10",5,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
