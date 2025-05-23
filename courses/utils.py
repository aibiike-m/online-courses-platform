# from django.db.models import Q
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector, SearchHeadline
from courses.models import Courses


def q_search(query):
    if query.isdigit() and len(query) <= 5:
        return Courses.objects.filter(id=int(query))

    vector = SearchVector("name")
    query = SearchQuery(query)

    result = Courses.objects.annotate(rank=SearchRank(vector, query)).filter(rank__gt=0).order_by("-rank")

    # result = result.annotate(headline=SearchHeadline("name", query, start_sel='<span style="background-color: yellow;">', stop_sel='</span>',))
    return result

