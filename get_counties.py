import pandas as pd

countes_list = pd.read_html('https://en.wikipedia.org/wiki/List_of_counties_by_U.S._state_and_territory')
countes_list = pd.DataFrame(countes_list)
countes_list.to_csv('./counties.csv')
print(countes_list)