import S from "@sanity/desk-tool/structure-builder";
import  ListItemBuilder  from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Clubs")
        .schemaType("club")
        .child(
          S.documentTypeList("club").title("Clubs").child((clubId: string) =>
            S.document()
              .schemaType("club")
              .documentId(clubId)
              .views([
                S.view.form(),
                S.view
                  .component(() =>
                    S.list()
                      .title("Club Members")
                      .items([
                        S.listItem()
                          .title("Club Secretary")
                          .child(
                            S.documentList()
                              .title("Secretary")
                              .filter(
                                `_type == "member" && $clubId in clubs[]._ref && role == "club_sec"`
                              )
                              .params({ clubId })
                          ) as ListItemBuilder,
                        S.listItem()
                          .title("Members")
                          .child(
                            S.documentList()
                              .title("Members")
                              .filter(`_type == "member" && $clubId in clubs[]._ref`)
                              .params({ clubId })
                          ) as ListItemBuilder,
                      ])
                  )
                  .title("Club Members"),
              ])
          )
        ),
      S.listItem()
        .title("Members")
        .schemaType("member")
        .child(S.documentTypeList("member") as DocumentListBuilder),
    ]);
