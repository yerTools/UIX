/// <reference path="NumberGenerator.ts" />

namespace UIX.Libraries.Random.StringGenerator{
    const NUMBER_SET = "0123456789";
    const UPPER_CASE_LETTERS_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LOWER_CASE_LETTERS_SET = "abcdefghijklmnopqrstuvwxyz";
    const SPECIAL_SET = "^°!\"²§³$%&/{([)]=}?\\`´*++'#><|;,:._-";
    const WHITESPACE_SET = " \n\r\t";
    const UMLAUT_SET = "äöüÄÖÜáéíóúàèìòùâêîôû";
    const EMOJI_SET = "😀😃😄😁😆😅🤣😂🙂🙃😉😊😇🥰😍🤩😘😗☺😚😙😋😛😜🤪😝🤑🤗🤭🤫🤔🤐🤨😐😑😶😏😒🙄😬🤥😌😔😪🤤😴😷🤒🤕🤢🤮🤧🥵🥶🥴😵🤯🤠🥳😎🤓🧐😕😟🙁☹😮😯😲😳🥺😦😧😨😰😥😢😭😱😖😣😞😓😩😫🥱😤😡😠🤬😈👿💀☠💩🤡👹👺👻👽👾🤖😺😸😹😻😼😽🙀😿😾💋👋🤚🖐✋🖖👌🤏✌🤞🤟🤘🤙👈👉👆🖕👇☝👍👎✊👊🤛🤜👏🙌👐🤲🤝🙏✍💅🤳💪🦾🦿🦵🦶👂🦻👃🧠🦷🦴👀👁👅👄👶🧒👦👧🧑👱👨🧔👨‍🦰👨‍🦱👨‍🦳👨‍🦲👩👩‍🦰🧑‍🦰👩‍🦱🧑‍🦱👩‍🦳🧑‍🦳👩‍🦲🧑‍🦲👱‍♀️👱‍♂️🧓👴👵🙍🙍‍♂️🙍‍♀️🙎🙎‍♂️🙎‍♀️🙅🙅‍♂️🙅‍♀️🙆🙆‍♂️🙆‍♀️💁💁‍♂️💁‍♀️🙋🙋‍♂️🙋‍♀️🧏🧏‍♂️🧏‍♀️🙇🙇‍♂️🙇‍♀️🤦🤦‍♂️🤦‍♀️🤷🤷‍♂️🤷‍♀️🧑‍⚕️👨‍⚕️👩‍⚕️🧑‍🎓👨‍🎓👩‍🎓🧑‍🏫👨‍🏫👩‍🏫🧑‍⚖️👨‍⚖️👩‍⚖️🧑‍🌾👨‍🌾👩‍🌾🧑‍🍳👨‍🍳👩‍🍳🧑‍🔧👨‍🔧👩‍🔧🧑‍🏭👨‍🏭👩‍🏭🧑‍💼👨‍💼👩‍💼🧑‍🔬👨‍🔬👩‍🔬🧑‍💻👨‍💻👩‍💻🧑‍🎤👨‍🎤👩‍🎤🧑‍🎨👨‍🎨👩‍🎨🧑‍✈️👨‍✈️👩‍✈️🧑‍🚀👨‍🚀👩‍🚀🧑‍🚒👨‍🚒👩‍🚒👮👮‍♂️👮‍♀️🕵🕵️‍♂️🕵️‍♀️💂💂‍♂️💂‍♀️👷👷‍♂️👷‍♀️🤴👸👳👳‍♂️👳‍♀️👲🧕🤵👰🤰🤱🧑‍🍼👼🎅🤶🦸🦸‍♂️🦸‍♀️🦹🦹‍♂️🦹‍♀️🧙🧙‍♂️🧙‍♀️🧚🧚‍♂️🧚‍♀️🧛🧛‍♂️🧛‍♀️🧜🧜‍♂️🧜‍♀️🧝🧝‍♂️🧝‍♀️🧞🧞‍♂️🧞‍♀️🧟🧟‍♂️🧟‍♀️💆💆‍♂️💆‍♀️💇💇‍♂️💇‍♀️🚶🚶‍♂️🚶‍♀️🧍🧍‍♂️🧍‍♀️🧎🧎‍♂️🧎‍♀️🧑‍🦯👨‍🦯👩‍🦯🧑‍🦼👨‍🦼👩‍🦼🧑‍🦽👨‍🦽👩‍🦽🏃🏃‍♂️🏃‍♀️💃🕺🕴👯👯‍♂️👯‍♀️🧖🧖‍♂️🧖‍♀️🧘🧑‍🤝‍🧑👭👫👬💏👩‍❤️‍💋‍👨👨‍❤️‍💋‍👨👩‍❤️‍💋‍👩💑👩‍❤️‍👨👨‍❤️‍👨👩‍❤️‍👩👪👨‍👩‍👦👨‍👩‍👧👨‍👩‍👧‍👦👨‍👩‍👦‍👦👨‍👩‍👧‍👧👨‍👨‍👦👨‍👨‍👧👨‍👨‍👧‍👦👨‍👨‍👦‍👦👨‍👨‍👧‍👧👩‍👩‍👦👩‍👩‍👧👩‍👩‍👧‍👦👩‍👩‍👦‍👦👩‍👩‍👧‍👧👨‍👦👨‍👦‍👦👨‍👧👨‍👧‍👦👨‍👧‍👧👩‍👦👩‍👦‍👦👩‍👧👩‍👧‍👦👩‍👧‍👧🗣👤👥👣🧳🌂☂🎃🧵🧶👓🕶🥽🥼🦺👔👕👖🧣🧤🧥🧦👗👘🥻🩱🩲🩳👙👚👛👜👝🎒👞👟🥾🥿👠👡🩰👢👑👒🎩🎓🧢⛑💄💍💼🩸"
                    + "👋🏻🤚🏻🖐🏻✋🏻🖖🏻👌🏻🤌🏻🤏🏻✌🏻🤞🏻🤟🏻🤘🏻🤙🏻👈🏻👉🏻👆🏻🖕🏻👇🏻☝🏻👍🏻👎🏻✊🏻👊🏻🤛🏻🤜🏻👏🏻🙌🏻👐🏻🤲🏻🙏🏻✍🏻💅🏻🤳🏻💪🏻🦵🏻🦶🏻👂🏻🦻🏻👃🏻👶🏻🧒🏻👦🏻👧🏻🧑🏻👱🏻👨🏻🧔🏻👨🏻‍🦰👨🏻‍🦱👨🏻‍🦳👨🏻‍🦲👩🏻👩🏻‍🦰🧑🏻‍🦰👩🏻‍🦱🧑🏻‍🦱👩🏻‍🦳🧑🏻‍🦳👩🏻‍🦲🧑🏻‍🦲👱🏻‍♀️👱🏻‍♂️🧓🏻👴🏻👵🏻🙍🏻🙍🏻‍♂️🙍🏻‍♀️🙎🏻🙎🏻‍♂️🙎🏻‍♀️🙅🏻🙅🏻‍♂️🙅🏻‍♀️🙆🏻🙆🏻‍♂️🙆🏻‍♀️💁🏻💁🏻‍♂️💁🏻‍♀️🙋🏻🙋🏻‍♂️🙋🏻‍♀️🧏🏻🧏🏻‍♂️🧏🏻‍♀️🙇🏻🙇🏻‍♂️🙇🏻‍♀️🤦🏻🤦🏻‍♂️🤦🏻‍♀️🤷🏻🤷🏻‍♂️🤷🏻‍♀️🧑🏻‍⚕️👨🏻‍⚕️👩🏻‍⚕️🧑🏻‍🎓👨🏻‍🎓👩🏻‍🎓🧑🏻‍🏫👨🏻‍🏫👩🏻‍🏫🧑🏻‍⚖️👨🏻‍⚖️👩🏻‍⚖️🧑🏻‍🌾👨🏻‍🌾👩🏻‍🌾🧑🏻‍🍳👨🏻‍🍳👩🏻‍🍳🧑🏻‍🔧👨🏻‍🔧👩🏻‍🔧🧑🏻‍🏭👨🏻‍🏭👩🏻‍🏭🧑🏻‍💼👨🏻‍💼👩🏻‍💼🧑🏻‍🔬👨🏻‍🔬👩🏻‍🔬🧑🏻‍💻👨🏻‍💻👩🏻‍💻🧑🏻‍🎤👨🏻‍🎤👩🏻‍🎤🧑🏻‍🎨👨🏻‍🎨👩🏻‍🎨🧑🏻‍✈️👨🏻‍✈️👩🏻‍✈️🧑🏻‍🚀👨🏻‍🚀👩🏻‍🚀🧑🏻‍🚒👨🏻‍🚒👩🏻‍🚒👮🏻👮🏻‍♂️👮🏻‍♀️🕵🏻🕵🏻‍♂️🕵🏻‍♀️💂🏻💂🏻‍♂️💂🏻‍♀️🥷🏻👷🏻👷🏻‍♂️👷🏻‍♀️🤴🏻👸🏻👳🏻👳🏻‍♂️👳🏻‍♀️👲🏻🧕🏻🤵🏻🤵🏻‍♂️🤵🏻‍♀️👰🏻👰🏻‍♂️👰🏻‍♀️🤰🏻🤱🏻👩🏻‍🍼👨🏻‍🍼🧑🏻‍🍼👼🏻🎅🏻🤶🏻🧑🏻‍🎄🦸🏻🦸🏻‍♂️🦸🏻‍♀️🦹🏻🦹🏻‍♂️🦹🏻‍♀️🧙🏻🧙🏻‍♂️🧙🏻‍♀️🧚🏻🧚🏻‍♂️🧚🏻‍♀️🧛🏻🧛🏻‍♂️🧛🏻‍♀️🧜🏻🧜🏻‍♂️🧜🏻‍♀️🧝🏻🧝🏻‍♂️🧝🏻‍♀️💆🏻💆🏻‍♂️💆🏻‍♀️💇🏻💇🏻‍♂️💇🏻‍♀️🚶🏻🚶🏻‍♂️🚶🏻‍♀️🧍🏻🧍🏻‍♂️🧍🏻‍♀️🧎🏻🧎🏻‍♂️🧎🏻‍♀️🧑🏻‍🦯👨🏻‍🦯👩🏻‍🦯🧑🏻‍🦼👨🏻‍🦼👩🏻‍🦼🧑🏻‍🦽👨🏻‍🦽👩🏻‍🦽🏃🏻🏃🏻‍♂️🏃🏻‍♀️💃🏻🕺🏻🕴🏻🧖🏻🧖🏻‍♂️🧖🏻‍♀️🧗🏻🧗🏻‍♂️🧗🏻‍♀️🏇🏻🏂🏻🏌🏻🏌🏻‍♂️🏌🏻‍♀️🏄🏻🏄🏻‍♂️🏄🏻‍♀️🚣🏻🚣🏻‍♂️🚣🏻‍♀️🏊🏻🏊🏻‍♂️🏊🏻‍♀️⛹🏻⛹🏻‍♂️⛹🏻‍♀️🏋🏻🏋🏻‍♂️🏋🏻‍♀️🚴🏻🚴🏻‍♂️🚴🏻‍♀️🚵🏻🚵🏻‍♂️🚵🏻‍♀️🤸🏻🤸🏻‍♂️🤸🏻‍♀️🤽🏻🤽🏻‍♂️🤽🏻‍♀️🤾🏻🤾🏻‍♂️🤾🏻‍♀️🤹🏻🤹🏻‍♂️🤹🏻‍♀️🧘🏻🧘🏻‍♂️🧘🏻‍♀️🛀🏻🛌🏻👭🏻👫🏻👬🏻"
                    + "👋🏼🤚🏼🖐🏼✋🏼🖖🏼👌🏼🤌🏼🤏🏼✌🏼🤞🏼🤟🏼🤘🏼🤙🏼👈🏼👉🏼👆🏼🖕🏼👇🏼☝🏼👍🏼👎🏼✊🏼👊🏼🤛🏼🤜🏼👏🏼🙌🏼👐🏼🤲🏼🙏🏼✍🏼💅🏼🤳🏼💪🏼🦵🏼🦶🏼👂🏼🦻🏼👃🏼👶🏼🧒🏼👦🏼👧🏼🧑🏼👱🏼👨🏼🧔🏼👨🏼‍🦰👨🏼‍🦱👨🏼‍🦳👨🏼‍🦲👩🏼👩🏼‍🦰🧑🏼‍🦰👩🏼‍🦱🧑🏼‍🦱👩🏼‍🦳🧑🏼‍🦳👩🏼‍🦲🧑🏼‍🦲👱🏼‍♀️👱🏼‍♂️🧓🏼👴🏼👵🏼🙍🏼🙍🏼‍♂️🙍🏼‍♀️🙎🏼🙎🏼‍♂️🙎🏼‍♀️🙅🏼🙅🏼‍♂️🙅🏼‍♀️🙆🏼🙆🏼‍♂️🙆🏼‍♀️💁🏼💁🏼‍♂️💁🏼‍♀️🙋🏼🙋🏼‍♂️🙋🏼‍♀️🧏🏼🧏🏼‍♂️🧏🏼‍♀️🙇🏼🙇🏼‍♂️🙇🏼‍♀️🤦🏼🤦🏼‍♂️🤦🏼‍♀️🤷🏼🤷🏼‍♂️🤷🏼‍♀️🧑🏼‍⚕️👨🏼‍⚕️👩🏼‍⚕️🧑🏼‍🎓👨🏼‍🎓👩🏼‍🎓🧑🏼‍🏫👨🏼‍🏫👩🏼‍🏫🧑🏼‍⚖️👨🏼‍⚖️👩🏼‍⚖️🧑🏼‍🌾👨🏼‍🌾👩🏼‍🌾🧑🏼‍🍳👨🏼‍🍳👩🏼‍🍳🧑🏼‍🔧👨🏼‍🔧👩🏼‍🔧🧑🏼‍🏭👨🏼‍🏭👩🏼‍🏭🧑🏼‍💼👨🏼‍💼👩🏼‍💼🧑🏼‍🔬👨🏼‍🔬👩🏼‍🔬🧑🏼‍💻👨🏼‍💻👩🏼‍💻🧑🏼‍🎤👨🏼‍🎤👩🏼‍🎤🧑🏼‍🎨👨🏼‍🎨👩🏼‍🎨🧑🏼‍✈️👨🏼‍✈️👩🏼‍✈️🧑🏼‍🚀👨🏼‍🚀👩🏼‍🚀🧑🏼‍🚒👨🏼‍🚒👩🏼‍🚒👮🏼👮🏼‍♂️👮🏼‍♀️🕵🏼🕵🏼‍♂️🕵🏼‍♀️💂🏼💂🏼‍♂️💂🏼‍♀️🥷🏼👷🏼👷🏼‍♂️👷🏼‍♀️🤴🏼👸🏼👳🏼👳🏼‍♂️👳🏼‍♀️👲🏼🧕🏼🤵🏼🤵🏼‍♂️🤵🏼‍♀️👰🏼👰🏼‍♂️👰🏼‍♀️🤰🏼🤱🏼👩🏼‍🍼👨🏼‍🍼🧑🏼‍🍼👼🏼🎅🏼🤶🏼🧑🏼‍🎄🦸🏼🦸🏼‍♂️🦸🏼‍♀️🦹🏼🦹🏼‍♂️🦹🏼‍♀️🧙🏼🧙🏼‍♂️🧙🏼‍♀️🧚🏼🧚🏼‍♂️🧚🏼‍♀️🧛🏼🧛🏼‍♂️🧛🏼‍♀️🧜🏼🧜🏼‍♂️🧜🏼‍♀️🧝🏼🧝🏼‍♂️🧝🏼‍♀️💆🏼💆🏼‍♂️💆🏼‍♀️💇🏼💇🏼‍♂️💇🏼‍♀️🚶🏼🚶🏼‍♂️🚶🏼‍♀️🧍🏼🧍🏼‍♂️🧍🏼‍♀️🧎🏼🧎🏼‍♂️🧎🏼‍♀️🧑🏼‍🦯👨🏼‍🦯👩🏼‍🦯🧑🏼‍🦼👨🏼‍🦼👩🏼‍🦼🧑🏼‍🦽👨🏼‍🦽👩🏼‍🦽🏃🏼🏃🏼‍♂️🏃🏼‍♀️💃🏼🕺🏼🕴🏼🧖🏼🧖🏼‍♂️🧖🏼‍♀️🧗🏼🧗🏼‍♂️🧗🏼‍♀️🏇🏼🏂🏼🏌🏼🏌🏼‍♂️🏌🏼‍♀️🏄🏼🏄🏼‍♂️🏄🏼‍♀️🚣🏼🚣🏼‍♂️🚣🏼‍♀️🏊🏼🏊🏼‍♂️🏊🏼‍♀️⛹🏼⛹🏼‍♂️⛹🏼‍♀️🏋🏼🏋🏼‍♂️🏋🏼‍♀️🚴🏼🚴🏼‍♂️🚴🏼‍♀️🚵🏼🚵🏼‍♂️🚵🏼‍♀️🤸🏼🤸🏼‍♂️🤸🏼‍♀️🤽🏼🤽🏼‍♂️🤽🏼‍♀️🤾🏼🤾🏼‍♂️🤾🏼‍♀️🤹🏼🤹🏼‍♂️🤹🏼‍♀️🧘🏼🧘🏼‍♂️🧘🏼‍♀️🛀🏼🛌🏼👭🏼👫🏼👬🏼"
                    + "👋🏽🤚🏽🖐🏽✋🏽🖖🏽👌🏽🤌🏽🤏🏽✌🏽🤞🏽🤟🏽🤘🏽🤙🏽👈🏽👉🏽👆🏽🖕🏽👇🏽☝🏽👍🏽👎🏽✊🏽👊🏽🤛🏽🤜🏽👏🏽🙌🏽👐🏽🤲🏽🙏🏽✍🏽💅🏽🤳🏽💪🏽🦵🏽🦶🏽👂🏽🦻🏽👃🏽👶🏽🧒🏽👦🏽👧🏽🧑🏽👱🏽👨🏽🧔🏽👨🏽‍🦰👨🏽‍🦱👨🏽‍🦳👨🏽‍🦲👩🏽👩🏽‍🦰🧑🏽‍🦰👩🏽‍🦱🧑🏽‍🦱👩🏽‍🦳🧑🏽‍🦳👩🏽‍🦲🧑🏽‍🦲👱🏽‍♀️👱🏽‍♂️🧓🏽👴🏽👵🏽🙍🏽🙍🏽‍♂️🙍🏽‍♀️🙎🏽🙎🏽‍♂️🙎🏽‍♀️🙅🏽🙅🏽‍♂️🙅🏽‍♀️🙆🏽🙆🏽‍♂️🙆🏽‍♀️💁🏽💁🏽‍♂️💁🏽‍♀️🙋🏽🙋🏽‍♂️🙋🏽‍♀️🧏🏽🧏🏽‍♂️🧏🏽‍♀️🙇🏽🙇🏽‍♂️🙇🏽‍♀️🤦🏽🤦🏽‍♂️🤦🏽‍♀️🤷🏽🤷🏽‍♂️🤷🏽‍♀️🧑🏽‍⚕️👨🏽‍⚕️👩🏽‍⚕️🧑🏽‍🎓👨🏽‍🎓👩🏽‍🎓🧑🏽‍🏫👨🏽‍🏫👩🏽‍🏫🧑🏽‍⚖️👨🏽‍⚖️👩🏽‍⚖️🧑🏽‍🌾👨🏽‍🌾👩🏽‍🌾🧑🏽‍🍳👨🏽‍🍳👩🏽‍🍳🧑🏽‍🔧👨🏽‍🔧👩🏽‍🔧🧑🏽‍🏭👨🏽‍🏭👩🏽‍🏭🧑🏽‍💼👨🏽‍💼👩🏽‍💼🧑🏽‍🔬👨🏽‍🔬👩🏽‍🔬🧑🏽‍💻👨🏽‍💻👩🏽‍💻🧑🏽‍🎤👨🏽‍🎤👩🏽‍🎤🧑🏽‍🎨👨🏽‍🎨👩🏽‍🎨🧑🏽‍✈️👨🏽‍✈️👩🏽‍✈️🧑🏽‍🚀👨🏽‍🚀👩🏽‍🚀🧑🏽‍🚒👨🏽‍🚒👩🏽‍🚒👮🏽👮🏽‍♂️👮🏽‍♀️🕵🏽🕵🏽‍♂️🕵🏽‍♀️💂🏽💂🏽‍♂️💂🏽‍♀️🥷🏽👷🏽👷🏽‍♂️👷🏽‍♀️🤴🏽👸🏽👳🏽👳🏽‍♂️👳🏽‍♀️👲🏽🧕🏽🤵🏽🤵🏽‍♂️🤵🏽‍♀️👰🏽👰🏽‍♂️👰🏽‍♀️🤰🏽🤱🏽👩🏽‍🍼👨🏽‍🍼🧑🏽‍🍼👼🏽🎅🏽🤶🏽🧑🏽‍🎄🦸🏽🦸🏽‍♂️🦸🏽‍♀️🦹🏽🦹🏽‍♂️🦹🏽‍♀️🧙🏽🧙🏽‍♂️🧙🏽‍♀️🧚🏽🧚🏽‍♂️🧚🏽‍♀️🧛🏽🧛🏽‍♂️🧛🏽‍♀️🧜🏽🧜🏽‍♂️🧜🏽‍♀️🧝🏽🧝🏽‍♂️🧝🏽‍♀️💆🏽💆🏽‍♂️💆🏽‍♀️💇🏽💇🏽‍♂️💇🏽‍♀️🚶🏽🚶🏽‍♂️🚶🏽‍♀️🧍🏽🧍🏽‍♂️🧍🏽‍♀️🧎🏽🧎🏽‍♂️🧎🏽‍♀️🧑🏽‍🦯👨🏽‍🦯👩🏽‍🦯🧑🏽‍🦼👨🏽‍🦼👩🏽‍🦼🧑🏽‍🦽👨🏽‍🦽👩🏽‍🦽🏃🏽🏃🏽‍♂️🏃🏽‍♀️💃🏽🕺🏽🕴🏽🧖🏽🧖🏽‍♂️🧖🏽‍♀️🧗🏽🧗🏽‍♂️🧗🏽‍♀️🏇🏽🏂🏽🏌🏽🏌🏽‍♂️🏌🏽‍♀️🏄🏽🏄🏽‍♂️🏄🏽‍♀️🚣🏽🚣🏽‍♂️🚣🏽‍♀️🏊🏽🏊🏽‍♂️🏊🏽‍♀️⛹🏽⛹🏽‍♂️⛹🏽‍♀️🏋🏽🏋🏽‍♂️🏋🏽‍♀️🚴🏽🚴🏽‍♂️🚴🏽‍♀️🚵🏽🚵🏽‍♂️🚵🏽‍♀️🤸🏽🤸🏽‍♂️🤸🏽‍♀️🤽🏽🤽🏽‍♂️🤽🏽‍♀️🤾🏽🤾🏽‍♂️🤾🏽‍♀️🤹🏽🤹🏽‍♂️🤹🏽‍♀️🧘🏽🧘🏽‍♂️🧘🏽‍♀️🛀🏽🛌🏽👭🏽👫🏽👬🏽"
                    + "👋🏾🤚🏾🖐🏾✋🏾🖖🏾👌🏾🤌🏾🤏🏾✌🏾🤞🏾🤟🏾🤘🏾🤙🏾👈🏾👉🏾👆🏾🖕🏾👇🏾☝🏾👍🏾👎🏾✊🏾👊🏾🤛🏾🤜🏾👏🏾🙌🏾👐🏾🤲🏾🙏🏾✍🏾💅🏾🤳🏾💪🏾🦵🏾🦶🏾👂🏾🦻🏾👃🏾👶🏾🧒🏾👦🏾👧🏾🧑🏾👱🏾👨🏾🧔🏾👨🏾‍🦰👨🏾‍🦱👨🏾‍🦳👨🏾‍🦲👩🏾👩🏾‍🦰🧑🏾‍🦰👩🏾‍🦱🧑🏾‍🦱👩🏾‍🦳🧑🏾‍🦳👩🏾‍🦲🧑🏾‍🦲👱🏾‍♀️👱🏾‍♂️🧓🏾👴🏾👵🏾🙍🏾🙍🏾‍♂️🙍🏾‍♀️🙎🏾🙎🏾‍♂️🙎🏾‍♀️🙅🏾🙅🏾‍♂️🙅🏾‍♀️🙆🏾🙆🏾‍♂️🙆🏾‍♀️💁🏾💁🏾‍♂️💁🏾‍♀️🙋🏾🙋🏾‍♂️🙋🏾‍♀️🧏🏾🧏🏾‍♂️🧏🏾‍♀️🙇🏾🙇🏾‍♂️🙇🏾‍♀️🤦🏾🤦🏾‍♂️🤦🏾‍♀️🤷🏾🤷🏾‍♂️🤷🏾‍♀️🧑🏾‍⚕️👨🏾‍⚕️👩🏾‍⚕️🧑🏾‍🎓👨🏾‍🎓👩🏾‍🎓🧑🏾‍🏫👨🏾‍🏫👩🏾‍🏫🧑🏾‍⚖️👨🏾‍⚖️👩🏾‍⚖️🧑🏾‍🌾👨🏾‍🌾👩🏾‍🌾🧑🏾‍🍳👨🏾‍🍳👩🏾‍🍳🧑🏾‍🔧👨🏾‍🔧👩🏾‍🔧🧑🏾‍🏭👨🏾‍🏭👩🏾‍🏭🧑🏾‍💼👨🏾‍💼👩🏾‍💼🧑🏾‍🔬👨🏾‍🔬👩🏾‍🔬🧑🏾‍💻👨🏾‍💻👩🏾‍💻🧑🏾‍🎤👨🏾‍🎤👩🏾‍🎤🧑🏾‍🎨👨🏾‍🎨👩🏾‍🎨🧑🏾‍✈️👨🏾‍✈️👩🏾‍✈️🧑🏾‍🚀👨🏾‍🚀👩🏾‍🚀🧑🏾‍🚒👨🏾‍🚒👩🏾‍🚒👮🏾👮🏾‍♂️👮🏾‍♀️🕵🏾🕵🏾‍♂️🕵🏾‍♀️💂🏾💂🏾‍♂️💂🏾‍♀️🥷🏾👷🏾👷🏾‍♂️👷🏾‍♀️🤴🏾👸🏾👳🏾👳🏾‍♂️👳🏾‍♀️👲🏾🧕🏾🤵🏾🤵🏾‍♂️🤵🏾‍♀️👰🏾👰🏾‍♂️👰🏾‍♀️🤰🏾🤱🏾👩🏾‍🍼👨🏾‍🍼🧑🏾‍🍼👼🏾🎅🏾🤶🏾🧑🏾‍🎄🦸🏾🦸🏾‍♂️🦸🏾‍♀️🦹🏾🦹🏾‍♂️🦹🏾‍♀️🧙🏾🧙🏾‍♂️🧙🏾‍♀️🧚🏾🧚🏾‍♂️🧚🏾‍♀️🧛🏾🧛🏾‍♂️🧛🏾‍♀️🧜🏾🧜🏾‍♂️🧜🏾‍♀️🧝🏾🧝🏾‍♂️🧝🏾‍♀️💆🏾💆🏾‍♂️💆🏾‍♀️💇🏾💇🏾‍♂️💇🏾‍♀️🚶🏾🚶🏾‍♂️🚶🏾‍♀️🧍🏾🧍🏾‍♂️🧍🏾‍♀️🧎🏾🧎🏾‍♂️🧎🏾‍♀️🧑🏾‍🦯👨🏾‍🦯👩🏾‍🦯🧑🏾‍🦼👨🏾‍🦼👩🏾‍🦼🧑🏾‍🦽👨🏾‍🦽👩🏾‍🦽🏃🏾🏃🏾‍♂️🏃🏾‍♀️💃🏾🕺🏾🕴🏾🧖🏾🧖🏾‍♂️🧖🏾‍♀️🧗🏾🧗🏾‍♂️🧗🏾‍♀️🏇🏾🏂🏾🏌🏾🏌🏾‍♂️🏌🏾‍♀️🏄🏾🏄🏾‍♂️🏄🏾‍♀️🚣🏾🚣🏾‍♂️🚣🏾‍♀️🏊🏾🏊🏾‍♂️🏊🏾‍♀️⛹🏾⛹🏾‍♂️⛹🏾‍♀️🏋🏾🏋🏾‍♂️🏋🏾‍♀️🚴🏾🚴🏾‍♂️🚴🏾‍♀️🚵🏾🚵🏾‍♂️🚵🏾‍♀️🤸🏾🤸🏾‍♂️🤸🏾‍♀️🤽🏾🤽🏾‍♂️🤽🏾‍♀️🤾🏾🤾🏾‍♂️🤾🏾‍♀️🤹🏾🤹🏾‍♂️🤹🏾‍♀️🧘🏾🧘🏾‍♂️🧘🏾‍♀️🛀🏾🛌🏾👭🏾👫🏾👬🏾"
                    + "👋🏿🤚🏿🖐🏿✋🏿🖖🏿👌🏿🤌🏿🤏🏿✌🏿🤞🏿🤟🏿🤘🏿🤙🏿👈🏿👉🏿👆🏿🖕🏿👇🏿☝🏿👍🏿👎🏿✊🏿👊🏿🤛🏿🤜🏿👏🏿🙌🏿👐🏿🤲🏿🙏🏿✍🏿💅🏿🤳🏿💪🏿🦵🏿🦶🏿👂🏿🦻🏿👃🏿👶🏿🧒🏿👦🏿👧🏿🧑🏿👱🏿👨🏿🧔🏿👨🏿‍🦰👨🏿‍🦱👨🏿‍🦳👨🏿‍🦲👩🏿👩🏿‍🦰🧑🏿‍🦰👩🏿‍🦱🧑🏿‍🦱👩🏿‍🦳🧑🏿‍🦳👩🏿‍🦲🧑🏿‍🦲👱🏿‍♀️👱🏿‍♂️🧓🏿👴🏿👵🏿🙍🏿🙍🏿‍♂️🙍🏿‍♀️🙎🏿🙎🏿‍♂️🙎🏿‍♀️🙅🏿🙅🏿‍♂️🙅🏿‍♀️🙆🏿🙆🏿‍♂️🙆🏿‍♀️💁🏿💁🏿‍♂️💁🏿‍♀️🙋🏿🙋🏿‍♂️🙋🏿‍♀️🧏🏿🧏🏿‍♂️🧏🏿‍♀️🙇🏿🙇🏿‍♂️🙇🏿‍♀️🤦🏿🤦🏿‍♂️🤦🏿‍♀️🤷🏿🤷🏿‍♂️🤷🏿‍♀️🧑🏿‍⚕️👨🏿‍⚕️👩🏿‍⚕️🧑🏿‍🎓👨🏿‍🎓👩🏿‍🎓🧑🏿‍🏫👨🏿‍🏫👩🏿‍🏫🧑🏿‍⚖️👨🏿‍⚖️👩🏿‍⚖️🧑🏿‍🌾👨🏿‍🌾👩🏿‍🌾🧑🏿‍🍳👨🏿‍🍳👩🏿‍🍳🧑🏿‍🔧👨🏿‍🔧👩🏿‍🔧🧑🏿‍🏭👨🏿‍🏭👩🏿‍🏭🧑🏿‍💼👨🏿‍💼👩🏿‍💼🧑🏿‍🔬👨🏿‍🔬👩🏿‍🔬🧑🏿‍💻👨🏿‍💻👩🏿‍💻🧑🏿‍🎤👨🏿‍🎤👩🏿‍🎤🧑🏿‍🎨👨🏿‍🎨👩🏿‍🎨🧑🏿‍✈️👨🏿‍✈️👩🏿‍✈️🧑🏿‍🚀👨🏿‍🚀👩🏿‍🚀🧑🏿‍🚒👨🏿‍🚒👩🏿‍🚒👮🏿👮🏿‍♂️👮🏿‍♀️🕵🏿🕵🏿‍♂️🕵🏿‍♀️💂🏿💂🏿‍♂️💂🏿‍♀️🥷🏿👷🏿👷🏿‍♂️👷🏿‍♀️🤴🏿👸🏿👳🏿👳🏿‍♂️👳🏿‍♀️👲🏿🧕🏿🤵🏿🤵🏿‍♂️🤵🏿‍♀️👰🏿👰🏿‍♂️👰🏿‍♀️🤰🏿🤱🏿👩🏿‍🍼👨🏿‍🍼🧑🏿‍🍼👼🏿🎅🏿🤶🏿🧑🏿‍🎄🦸🏿🦸🏿‍♂️🦸🏿‍♀️🦹🏿🦹🏿‍♂️🦹🏿‍♀️🧙🏿🧙🏿‍♂️🧙🏿‍♀️🧚🏿🧚🏿‍♂️🧚🏿‍♀️🧛🏿🧛🏿‍♂️🧛🏿‍♀️🧜🏿🧜🏿‍♂️🧜🏿‍♀️🧝🏿🧝🏿‍♂️🧝🏿‍♀️💆🏿💆🏿‍♂️💆🏿‍♀️💇🏿💇🏿‍♂️💇🏿‍♀️🚶🏿🚶🏿‍♂️🚶🏿‍♀️🧍🏿🧍🏿‍♂️🧍🏿‍♀️🧎🏿🧎🏿‍♂️🧎🏿‍♀️🧑🏿‍🦯👨🏿‍🦯👩🏿‍🦯🧑🏿‍🦼👨🏿‍🦼👩🏿‍🦼🧑🏿‍🦽👨🏿‍🦽👩🏿‍🦽🏃🏿🏃🏿‍♂️🏃🏿‍♀️💃🏿🕺🏿🕴🏿🧖🏿🧖🏿‍♂️🧖🏿‍♀️🧗🏿🧗🏿‍♂️🧗🏿‍♀️🏇🏿🏂🏿🏌🏿🏌🏿‍♂️🏌🏿‍♀️🏄🏿🏄🏿‍♂️🏄🏿‍♀️🚣🏿🚣🏿‍♂️🚣🏿‍♀️🏊🏿🏊🏿‍♂️🏊🏿‍♀️⛹🏿⛹🏿‍♂️⛹🏿‍♀️🏋🏿🏋🏿‍♂️🏋🏿‍♀️🚴🏿🚴🏿‍♂️🚴🏿‍♀️🚵🏿🚵🏿‍♂️🚵🏿‍♀️🤸🏿🤸🏿‍♂️🤸🏿‍♀️🤽🏿🤽🏿‍♂️🤽🏿‍♀️🤾🏿🤾🏿‍♂️🤾🏿‍♀️🤹🏿🤹🏿‍♂️🤹🏿‍♀️🧘🏿🧘🏿‍♂️🧘🏿‍♀️🛀🏿🛌🏿👭🏿👫🏿👬🏿"
                    + "🙈🙉🙊💥💫💦💨🐵🐒🦍🦧🐶🐕🦮🐕‍🦺🐩🐺🦊🦝🐱🐈🦁🐯🐅🐆🐴🐎🦄🦓🦌🐮🐂🐃🐄🐷🐖🐗🐽🐏🐑🐐🐪🐫🦙🦒🐘🦏🦛🐭🐁🐀🐹🐰🐇🐿🦔🦇🐻🐨🐼🦥🦦🦨🦘🦡🐾🦃🐔🐓🐣🐤🐥🐦🐧🕊🦅🦆🦢🦉🦩🦚🦜🐸🐊🐢🦎🐍🐲🐉🦕🦖🐳🐋🐬🐟🐠🐡🦈🐙🐚🐌🦋🐛🐜🐝🐞🦗🕷🕸🦂🦟🦠💐🌸💮🏵🌹🥀🌺🌻🌼🌷🌱🌲🌳🌴🌵🌾🌿☘🍀🍁🍂🍃🍄🌰🦀🦞🦐🦑🌍🌎🌏🌐🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜☀🌝🌞⭐🌟🌠☁⛅⛈🌤🌥🌦🌧🌨🌩🌪🌫🌬🌈☂☔⚡❄☃⛄☄🔥💧🌊🎄✨🎋🎍"
                    + "🍇🍈🍉🍊🍋🍌🍍🥭🍎🍏🍐🍑🍒🍓🥝🍅🥥🥑🍆🥔🥕🌽🌶🥒🥬🥦🧄🧅🍄🥜🌰🍞🥐🥖🥨🥯🥞🧇🧀🍖🍗🥩🥓🍔🍟🍕🌭🥪🌮🌯🥙🧆🥚🍳🥘🍲🥣🥗🍿🧈🧂🥫🍱🍘🍙🍚🍛🍜🍝🍠🍢🍣🍤🍥🥮🍡🥟🥠🥡🦪🍦🍧🍨🍩🍪🎂🍰🧁🥧🍫🍬🍭🍮🍯🍼🥛☕🍵🍶🍾🍷🍸🍹🍺🍻🥂🥃🥤🧃🧉🧊🥢🍽🍴🥄"
                    + "🕴🧗🧗‍♂️🧗‍♀️🤺🏇⛷🏂🏌🏌️‍♂️🏌️‍♀️🏄🏄‍♂️🏄‍♀️🚣🚣‍♂️🚣‍♀️🏊🏊‍♂️🏊‍♀️⛹⛹️‍♂️⛹️‍♀️🏋🏋️‍♂️🏋️‍♀️🚴🚴‍♂️🚴‍♀️🚵🚵‍♂️🚵‍♀️🤸🤸‍♂️🤸‍♀️🤼🤼‍♂️🤼‍♀️🤽🤽‍♂️🤽‍♀️🤾🤾‍♂️🤾‍♀️🤹🤹‍♂️🤹‍♀️🧘🧘‍♂️🧘‍♀️🎪🛹🛶🎗🎟🎫🎖🏆🏅🥇🥈🥉⚽⚾🥎🏀🏐🏈🏉🎾🥏🎳🏏🏑🏒🥍🏓🏸🥊🥋🥅⛳⛸🎣🎽🎿🛷🥌🎯🎱🎮🎰🎲🧩♟🎭🎨🧵🧶🎼🎤🎧🎷🎸🎹🎺🎻🥁🎬🏹"
                    + "🚣🗾🏔⛰🌋🗻🏕🏖🏜🏝🏞🏟🏛🏗🏘🏚🏠🏡🏢🏣🏤🏥🏦🏨🏩🏪🏫🏬🏭🏯🏰💒🗼🗽⛪🕌🛕🕍⛩🕋⛲⛺🌁🌃🏙🌄🌅🌆🌇🌉🎠🎡🎢🚂🚃🚄🚅🚆🚇🚈🚉🚊🚝🚞🚋🚌🚍🚎🚐🚑🚒🚓🚔🚕🚖🚗🚘🚙🚚🚛🚜🏎🏍🛵🛺🚲🛴🚏🛣🛤⛽🚨🚥🚦🚧⚓⛵🚤🛳⛴🛥🚢✈🛩🛫🛬🪂💺🚁🚟🚠🚡🛰🚀🛸🪐🌠🌌⛱🎆🎇🎑💴💵💶💷🗿🛂🛃🛄🛅"
                    + "💌🕳💣🛀🛌🔪🏺🗺🧭🧱💈🦽🦼🛢🛎🧳⌛⏳⌚⏰⏱⏲🕰🌡⛱🧨🎈🎉🎊🎎🎏🎐🧧🎀🎁🤿🪀🪁🔮🧿🕹🧸🖼🧵🧶🛍📿💎📯🎙🎚🎛📻🪕📱📲☎📞📟📠🔋🔌💻🖥🖨⌨🖱🖲💽💾💿📀🧮🎥🎞📽📺📷📸📹📼🔍🔎🕯💡🔦🏮🪔📔📕📖📗📘📙📚📓📒📃📜📄📰🗞📑🔖🏷💰💴💵💶💷💸💳🧾✉📧📨📩📤📥📦📫📪📬📭📮🗳✏✒🖋🖊🖌🖍📝📁📂🗂📅📆🗒🗓📇📈📉📊📋📌📍📎🖇📏📐✂🗃🗄🗑🔒🔓🔏🔐🔑🗝🔨🪓⛏⚒🛠🗡⚔🔫🛡🔧🔩⚙🗜⚖🦯🔗⛓🧰🧲⚗🧪🧫🧬🔬🔭📡💉🩸💊🩹🩺🚪🛏🛋🪑🚽🚿🛁🪒🧴🧷🧹🧺🧻🧼🧽🧯🛒🚬⚰⚱🗿🚰"
                    + "🏁🚩🎌🏴🏳🏳️‍🌈🏳️‍⚧️🏴‍☠️🇦🇨🇦🇩🇦🇪🇦🇫🇦🇬🇦🇮🇦🇱🇦🇲🇦🇴🇦🇶🇦🇷🇦🇸🇦🇹🇦🇺🇦🇼🇦🇽🇦🇿🇧🇦🇧🇧🇧🇩🇧🇪🇧🇫🇧🇬🇧🇭🇧🇮🇧🇯🇧🇱🇧🇲🇧🇳🇧🇴🇧🇶🇧🇷🇧🇸🇧🇹🇧🇻🇧🇼🇧🇾🇧🇿🇨🇦🇨🇨🇨🇩🇨🇫🇨🇬🇨🇭🇨🇮🇨🇰🇨🇱🇨🇲🇨🇳🇨🇴🇨🇵🇨🇷🇨🇺🇨🇻🇨🇼🇨🇽🇨🇾🇨🇿🇩🇪🇩🇬🇩🇯🇩🇰🇩🇲🇩🇴🇩🇿🇪🇦🇪🇨🇪🇪🇪🇬🇪🇭🇪🇷🇪🇸🇪🇹🇪🇺🇫🇮🇫🇯🇫🇰🇫🇲🇫🇴🇫🇷🇬🇦🇬🇧🇬🇩🇬🇪🇬🇫🇬🇬🇬🇭🇬🇮🇬🇱🇬🇲🇬🇳🇬🇵🇬🇶🇬🇷🇬🇸🇬🇹🇬🇺🇬🇼🇬🇾🇭🇰🇭🇲🇭🇳🇭🇷🇭🇹🇭🇺🇮🇨🇮🇩🇮🇪🇮🇱🇮🇲🇮🇳🇮🇴🇮🇶🇮🇷🇮🇸🇮🇹🇯🇪🇯🇲🇯🇴🇯🇵🇰🇪🇰🇬🇰🇭🇰🇮🇰🇲🇰🇳🇰🇵🇰🇷🇰🇼🇰🇾🇰🇿🇱🇦🇱🇧🇱🇨🇱🇮🇱🇰🇱🇷🇱🇸🇱🇹🇱🇺🇱🇻🇱🇾🇲🇦🇲🇨🇲🇩🇲🇪🇲🇫🇲🇬🇲🇭🇲🇰🇲🇱🇲🇲🇲🇳🇲🇴🇲🇵🇲🇶🇲🇷🇲🇸🇲🇹🇲🇺🇲🇻🇲🇼🇲🇽🇲🇾🇲🇿🇳🇦🇳🇨🇳🇪🇳🇫🇳🇬🇳🇮🇳🇱🇳🇴🇳🇵🇳🇷🇳🇺🇳🇿🇴🇲🇵🇦🇵🇪🇵🇫🇵🇬🇵🇭🇵🇰🇵🇱🇵🇲🇵🇳🇵🇷🇵🇸🇵🇹🇵🇼🇵🇾🇶🇦🇷🇪🇷🇴🇷🇸🇷🇺🇷🇼🇸🇦🇸🇧🇸🇨🇸🇩🇸🇪🇸🇬🇸🇭🇸🇮🇸🇯🇸🇰🇸🇱🇸🇲🇸🇳🇸🇴🇸🇷🇸🇸🇸🇹🇸🇻🇸🇽🇸🇾🇸🇿🇹🇦🇹🇨🇹🇩🇹🇫🇹🇬🇹🇭🇹🇯🇹🇰🇹🇱🇹🇲🇹🇳🇹🇴🇹🇷🇹🇹🇹🇻🇹🇼🇹🇿🇺🇦🇺🇬🇺🇲🇺🇳🇺🇸🇺🇾🇺🇿🇻🇦🇻🇨🇻🇪🇻🇬🇻🇮🇻🇳🇻🇺🇼🇫🇼🇸🇽🇰🇾🇪🇾🇹🇿🇦🇿🇲🇿🇼🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁳󠁣󠁴󠁿🏴󠁧󠁢󠁷󠁬󠁳󠁿🏴󠁵󠁳󠁴󠁸󠁿"
                    + "🥲🥸🤌🫀🫁🥷🤵‍♂️👰‍♂️👰‍♀️👩‍🍼🧑‍🍼👨‍🍼🧑‍🎄🫂🐈‍⬛🦬🦣🦫🐻‍❄️🦤🪶🦭🪲🪳🪰🪱🪴🫐🫒🫑🫓🫔🫕🫖🧋🪨🪵🛖🛻🛼🪄🪅🪆🪡🪢🩴🪖🪗🪘🪙🪃🪚🪛🪝🪜🛗🪞🪟🪠🪤🪣🪥🪦🪧🏳️‍⚧️";

    function internal(charMinRange:number, charMaxRange:number, maxLength:number, minLength?:number){
        let length = NumberGenerator.intBetween(maxLength, minLength);
        let result = "";
        while(result.length !== length){
            while(result.length < length){
                result += String.fromCharCode(NumberGenerator.intBetween(charMaxRange, charMinRange));
            }
            while(result.length > length){
                result = result.substring(1);
            }
        }
        return result;
    }

    function internalFromSet(set:string, maxLength:number, minLength?:number){
        let length = NumberGenerator.intBetween(maxLength, minLength);
        let result = "";
        while(result.length !== length){
            while(result.length < length){
                result += set[Math.floor(Math.random() * set.length)];
            }
            while(result.length > length){
                result = result.substring(1);
            }
        }
        return result;
    }

    export function utf32(maxLength:number, minLength?:number){
        return internal(0, 0x10ffff, maxLength, minLength);
    }

    export function utf16(maxLength:number, minLength?:number){
        return internal(0, 0xffff, maxLength, minLength);
    }

    export function iso8859_1(maxLength:number, minLength?:number){
        return internal(0, 0xff, maxLength, minLength);
    }

    export function numbers(maxLength:number, minLength?:number){
        return internalFromSet(NUMBER_SET, maxLength, minLength);
    }

    export function base64(maxLength:number, minLength?:number){
        return internalFromSet(UPPER_CASE_LETTERS_SET + LOWER_CASE_LETTERS_SET + NUMBER_SET + "+/", maxLength, minLength);
    }

    export function text(maxLength:number, minLength?:number){
        return internalFromSet(UPPER_CASE_LETTERS_SET + LOWER_CASE_LETTERS_SET, maxLength, minLength);
    }

    export function special(maxLength:number, minLength?:number){
        return internalFromSet(SPECIAL_SET, maxLength, minLength);
    }

    export function whitespace(maxLength:number, minLength?:number){
        return internalFromSet(WHITESPACE_SET, maxLength, minLength);
    }

    export function umlaut(maxLength:number, minLength?:number){
        return internalFromSet(UMLAUT_SET, maxLength, minLength);
    }

    export function emoji(maxLength:number, minLength?:number){
        return internalFromSet(EMOJI_SET, maxLength, minLength);
    }

    export function readable(maxLength:number, minLength?:number){
        return internalFromSet(NUMBER_SET + UPPER_CASE_LETTERS_SET + LOWER_CASE_LETTERS_SET + SPECIAL_SET + WHITESPACE_SET + UMLAUT_SET + "ß" + EMOJI_SET, maxLength, minLength);
    }
}