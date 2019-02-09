
export class Elastic {
    type    :string;
    query   :string;
    size    :number;
    limit   :number;
}

export class ElasticSuggest {
    type    :string;
    field   :string;
    value   :string;
}