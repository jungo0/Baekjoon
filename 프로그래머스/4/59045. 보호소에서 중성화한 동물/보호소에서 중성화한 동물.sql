select 
    ao.ANIMAL_ID,
    ao.ANIMAL_TYPE,
    ao.NAME
from ANIMAL_INS ai
join ANIMAL_OUTS ao on ai.ANIMAL_ID = ao.ANIMAL_ID
where SEX_UPON_INTAKE like '%Intact%'
and (SEX_UPON_OUTCOME like 'Neutered%' or SEX_UPON_OUTCOME like 'Spayed%')
order by ao.ANIMAL_ID;