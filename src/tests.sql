SELECT s.title
FROM "Series" s
JOIN keywords_series ks ON s.id = ks."seriesId" 
JOIN keywords k ON ks."keywordsId" = k.id
WHERE k.name LIKE '%пригоди%';