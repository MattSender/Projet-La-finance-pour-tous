var again, interest_amount, maluce_amount, month_list, month_position, monthly_interests_list, old_remaining_capital, remaining_capital_list, six_months_interests, total_interests, total_interests_list, value1, value10, value2, value3, value4, value5, value6, value7, value8, value9;

function toggleTBody(id) {
  if ($("#"+id+"-on").css("display") === "table-row-group") {
    $("#"+id+"-on").css("display","none");
    $("#"+id+"-off").css("display","table-row-group");
  } else {
    $("#"+id+"-on").css("display","table-row-group");
    $("#"+id+"-off").css("display","none");
  }
}

function truncate(n) {
//  return Number.parseInt(n * 100) / 100;
    return new Intl.NumberFormat(
      'fr-FR', { style: 'currency', currency: 'EUR' }
      ).format(n)
}

remaining_capital_list = [];
month_list = [];
monthly_interests_list = [];
total_interests = 0;
total_interests_list = [];
month_position = 0;

function real_estate_loan(capital, time, interest, insurance) {
  var insurance_per, interest_per, loop, monthly_insurance, monthly_interests, monthly_payment, reimbursed_capital, reimbursed_capital_list, remaining_capital;
  interest_per = interest / 100;
  monthly_payment = capital * (interest_per / 12) / (1 - Math.pow(1 + interest_per / 12, -time));
  insurance_per = insurance / 100;
  monthly_insurance = capital * insurance_per / 12;
  total_interests = 0;
//  console.log(`---------------------------------------------------\nMensualité:	${truncate(monthly_payment)} €/mois\nPart Assurance:	${truncate(monthly_insurance)} €/mois`);
  $("#monthly_payment").text(truncate(monthly_payment));
  $("#monthly_insurance").text(truncate(monthly_insurance));
//  console.log("Mois\tInt\u00e9r\u00eats mensuels\tPart Capital\tCapital restant D\u00fb");
  remaining_capital = capital;
  loop = Number.parseInt(time);
  monthly_interests_list = [];
  total_interests_list = [];
  reimbursed_capital_list = [];
  remaining_capital_list = [];
  month_list = [];

  $("#tableau-pret-on").html
    ( '<tr>\n'
    + '    <td colspan="4" class="bouton row-submit header-row">\n'
    + '        <input class="bt-submit btn" type="button"\n'
    + '            name="-" value="-"\n'
    + '            autocapitalize="off" autocorrect="off" spellcheck="false">\n'
    + '    </td>\n'
    + '</tr>\n'
    );

  for (var month_loop = 0, _pj_a = loop + 1; month_loop < _pj_a; month_loop += 1) {
    if (month_loop === 0) {
      monthly_interests = 0;
      reimbursed_capital = 0;
      remaining_capital = capital;
    } else {
      monthly_interests = interest / 12 * remaining_capital / 100;
      reimbursed_capital = monthly_payment - monthly_interests;
      remaining_capital -= reimbursed_capital;
      total_interests += monthly_interests;
    }

    monthly_interests_list.push(monthly_interests);
    total_interests_list.push(total_interests);
    reimbursed_capital_list.push(reimbursed_capital);
    remaining_capital_list.push(remaining_capital);
    month_list.push(month_loop);
//    console.log(`${month_loop}		${truncate(monthly_interests)}€			${truncate(reimbursed_capital)}€			${truncate(remaining_capital)}€`);
    $("#tableau-pret-on").append
      ( '<tr>\n'
      + '    <td class="lib--right header-row">' + month_loop + '</td>\n'
      + '    <td class="lib--right">' + truncate(monthly_interests) + '</td>\n'
      + '    <td class="lib--right">' + truncate(reimbursed_capital) + '</td>\n'
      + '    <td class="lib--right">' + truncate(remaining_capital) + '</td>\n'
      + '</tr>\n'
      );
  }

//  console.log(`Coût des intérêts à rembourser: ${truncate(total_interests)}€`);
  $("#total_interests").text(truncate(total_interests));
}

function real_estate_modifier(month_2, maluce, time_2, interest_2, insurance_2) {
  var insurance_2_per, interest_2_per, loop, maluce_per, month_list_2, monthly_interests_list_2, new_capital, new_monthly_insurance, new_monthly_interests, new_monthly_payment, new_reimbursed_capital, new_remaining_capital, new_total_interests, reimbursed_capital_list_2, remaining_capital_list_2, remaining_interests;
  maluce_per = maluce / 100;
  interest_2_per = interest_2 / 100;
  new_capital = old_remaining_capital * (1 + maluce_per);
  remaining_interests = total_interests - total_interests_list[month_position];
  new_monthly_payment = new_capital * (interest_2_per / 12) / (1 - Math.pow(1 + interest_2_per / 12, -time_2));
  insurance_2_per = insurance_2 / 100;
  new_monthly_insurance = new_capital * insurance_2_per / 12;

//  console.log(`---------------------------------------------------\nCapital restant dû en tenant compte de la maluce:	${truncate(new_capital)} €/mois\nNouvelle Mensualité:	${truncate(new_monthly_payment)} €/mois\nNouvelle Part Assurance:	${truncate(new_monthly_insurance)} €/mois`);
  $("#new_capital").text(truncate(new_capital));
  $("#new_monthly_payment").text(truncate(new_monthly_payment));
  $("#new_monthly_insurance").text(truncate(new_monthly_insurance));

//  console.log("Mois\tInt\u00e9r\u00eats mensuels\tPart Capital\tCapital restant D\u00fb");
  new_remaining_capital = new_capital;
  loop = Number.parseInt(time_2);
  new_total_interests = 0;
  monthly_interests_list_2 = [];
  reimbursed_capital_list_2 = [];
  remaining_capital_list_2 = [];
  month_list_2 = [];

  $("#tableau-remb-on").html
    ( '<tr>\n'
    + '    <td colspan="4" class="bouton row-submit header-row">\n'
    + '        <input class="bt-submit btn" type="button"\n'
    + '            name="-" value="-"\n'
    + '            autocapitalize="off" autocorrect="off" spellcheck="false">\n'
    + '    </td>\n'
    + '</tr>\n'
    );

  for (var month_loop_2 = 0, _pj_a = loop + 1; month_loop_2 < _pj_a; month_loop_2 += 1) {
    if (month_loop_2 === 0) {
      new_monthly_interests = 0;
      new_reimbursed_capital = 0;
      new_remaining_capital = new_capital;
    } else {
      new_monthly_interests = interest_2 / 12 * new_remaining_capital / 100;
      new_reimbursed_capital = new_monthly_payment - new_monthly_interests;
      new_remaining_capital -= new_reimbursed_capital;
      new_total_interests += new_monthly_interests;
    }

    monthly_interests_list_2.push(new_monthly_interests);
    reimbursed_capital_list_2.push(new_reimbursed_capital);
    remaining_capital_list_2.push(new_remaining_capital);
    month_list_2.push(month_loop_2);
//    console.log(`${month_loop_2}		${truncate(new_monthly_interests)}€			${truncate(new_reimbursed_capital)}€			${truncate(new_remaining_capital)}€`);
    $("#tableau-remb-on").append
      ( '<tr>\n'
      + '    <td class="lib--right header-row">' + month_loop_2 + '</td>\n'
      + '    <td class="lib--right">' + truncate(new_monthly_interests) + '</td>\n'
      + '    <td class="lib--right">' + truncate(new_reimbursed_capital) + '</td>\n'
      + '    <td class="lib--right">' + truncate(new_remaining_capital) + '</td>\n'
      + '</tr>\n'
      );
  }

  new_total_interests += maluce_amount;
//  console.log(`Coût des intérêts à rembourser avec l'ancien intérêt à partir du ${Number.parseInt(month_2)}ème mois: ${truncate(remaining_interests)}€`);
  $("#start_month").text(Number.parseInt(month_2));
  $("#remaining_interests").text(truncate(remaining_interests));

//  console.log(`Coût des intérêts à rembourser avec les nouveaux paramètres plus la maluce: ${truncate(new_total_interests)}€`);
  $("#new_total_interests").text(truncate(new_total_interests));

  if (remaining_interests < new_total_interests) {
//    console.log(`Donc il est plus rentable de payer le reste des anciens intérêts`);
    $("#result").text("Donc il est plus rentable de payer le reste des anciens intérêts");
  } else {
//    console.log(`Donc il est plus rentable de payer les nouveaux intérêts`);
    $("#result").text("Donc il est plus rentable de payer les nouveaux intérêts");
  }
}

function calcul_pret() {

  /*
  value1 = Number.parseFloat(prompt("Capital: "));
  value2 = Number.parseFloat(prompt("Dur\u00e9e De l'Emprunt (Mois): "));
  value3 = Number.parseFloat(prompt("Int\u00e9r\u00eat (Pourcentage): "));
  value4 = Number.parseFloat(prompt("Assurance Mensuelle (Pourcentage): "));
  */
  value1 = Number.parseFloat($("#capital").val());
  $("#capital").val(value1);
  value2 = Number.parseFloat($("#duree").val());
  $("#duree").val(value2);
  value3 = Number.parseFloat($("#taux").val());
  $("#taux").val(value3);
  value4 = Number.parseFloat($("#assurance").val());
  $("#assurance").val(value4);

  real_estate_loan(value1, value2, value3, value4);
}

function calcul_remboursement() {
    /*
    value5 = Number.parseFloat(prompt("A partir de quel mois voulez-vous rembourser tout le Capital restant D\u00fb?: ")); //month_position
    value6 = Number.parseFloat(prompt("Pourcentage que vous devrez payer en plus du Capital restant D\u00fb?: ")); //maluce_amount
    value7 = Number.parseFloat(prompt("Dur\u00e9e Du Nouveau Emprunt (Mois): ")); //duree_nv
    value8 = Number.parseFloat(prompt("Nouveau Int\u00e9r\u00eat (Pourcentage): ")); //taux_nv
    value9 = Number.parseFloat(prompt("Nouvelle Assurance Mensuelle (Pourcentage): ")); //assurance_nv
    */
    value5 = Number.parseFloat($("#month_position").val());
    $("#month_position").val(value5);
    value6 = Number.parseFloat($("#maluce_amount").val());
    $("#maluce_amount").val(value6);
    value7 = Number.parseFloat($("#duree_nv").val());
    $("#duree_nv").val(value7);
    value8 = Number.parseFloat($("#taux_nv").val());
    $("#taux_nv").val(value8);
    value9 = Number.parseFloat($("#assurance_nv").val());
    $("#assurance_nv").val(value9);
  
    // Validation du pourcentage de malus

    six_months_interests = 0;

    for (var i = 0, _pj_a = 6; i < _pj_a; i += 1) {
      interest_amount = monthly_interests_list[month_position + i];
      six_months_interests += interest_amount;
    }

    month_position = month_list.indexOf(value5);
    old_remaining_capital = remaining_capital_list[month_position];
    //console.log(old_remaining_capital);
    maluce_amount = old_remaining_capital * (value6 / 100);

    if (value6 > 3 || maluce_amount >= six_months_interests) {
      /*
      console.log("Cette indemnit\u00e9 ne peut pas d\u00e9passer 3 % du capital restant d\u00fb avant le remboursement anticip\u00e9\net le montant de 6 mois d'int\u00e9r\u00eats sur le capital rembours\u00e9 par anticipation au taux moyen du pr\u00eat.");
      value6 = Number.parseFloat(prompt("Pourcentage que vous devrez payer en plus du Capital restant D\u00fb?: "));
      maluce_amount = old_remaining_capital * (value6 / 100);
      console.log(maluce_amount, six_months_interests);
      */
      //$("#msg-remb").val("2").change();
      //$("#msg-remb").addClass("entry__error");
      alert
        ( "Votre indemnité de remboursement anticipé ne peut pas excéder :\n"
        + "1 - 3 % du capital restant dû avant le remboursement anticipé "
        + "(=> valeur saisie : " + value6 + " %)\n"
        + "2 - 6 mois d'intérêts sur le "
        + "capital remboursé par anticipation au taux moyen du prêt\n"
        + "  => 6 mois d'intérêts : " + Math.round(six_months_interests) + " €\n"
        + "  => Montant calculé : " + Math.round(maluce_amount) + " €\n\n"
        + "Calculs réalisés avec les valeurs minimum de ces paramètres..."
        );
      //return;
      value6 = value6 > 3 ? 3 : value6 ;
      maluce_amount = maluce_amount >= six_months_interests ? 
        six_months_interests : maluce_amount ;
    } //else {
    //$("#msg-remb").val("1").change();
    //$("#msg-remb").removeClass("entry__error");
    //}

    // Calcul du nouvel emprunt
    real_estate_modifier(value5, value6, value7, value8, value9);
}