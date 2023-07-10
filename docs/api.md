## Classes

<dl>
<dt><a href="#DurationParser">DurationParser</a></dt>
<dd></dd>
<dt><a href="#DurationTranslator">DurationTranslator</a></dt>
<dd></dd>
<dt><a href="#DurationValidator">DurationValidator</a></dt>
<dd><p>Validate duration string without doing a conversion</p>
</dd>
<dt><a href="#TimeConverter">TimeConverter</a></dt>
<dd><p>Allow time conversion between units</p>
</dd>
<dt><a href="#TimeGroups">TimeGroups</a></dt>
<dd><p>Manage time groups and make some operations on them.</p>
</dd>
<dt><a href="#TimeIdentifiers">TimeIdentifiers</a></dt>
<dd><p>Manage time identifiers used in duration string. This class allows to use time identifiers from many languages.</p>
</dd>
</dl>

<a name="DurationParser"></a>

## DurationParser
**Kind**: global class  

* [DurationParser](#DurationParser)
    * [new DurationParser(locale, customTimeIdentifiers)](#new_DurationParser_new)
    * [.parse(input, targetUnit)](#DurationParser+parse) ⇒ <code>number</code> \| <code>null</code>
    * [.compose(time, sourceUnit, groupSeparator)](#DurationParser+compose) ⇒ <code>string</code> \| <code>null</code>

<a name="new_DurationParser_new"></a>

### new DurationParser(locale, customTimeIdentifiers)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| locale | <code>string</code> | <code>&quot;en&quot;</code> | Locale used for parsing duration |
| customTimeIdentifiers | [<code>TimeIdentifiers</code>](#TimeIdentifiers) \| <code>null</code> | <code></code> | Custom TimeIdentifiers object with added localized identifiers |

<a name="DurationParser+parse"></a>

### durationParser.parse(input, targetUnit) ⇒ <code>number</code> \| <code>null</code>
Return duration length from input expressed in target units

**Kind**: instance method of [<code>DurationParser</code>](#DurationParser)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> |  | Input duration string expressed in human-like pattern |
| targetUnit |  | <code>m</code> | Identifier of target time unit |

<a name="DurationParser+compose"></a>

### durationParser.compose(time, sourceUnit, groupSeparator) ⇒ <code>string</code> \| <code>null</code>
Create duration string from time amount

**Kind**: instance method of [<code>DurationParser</code>](#DurationParser)  

| Param | Default | Description |
| --- | --- | --- |
| time |  | input time amount expressed in source time unit |
| sourceUnit | <code>m</code> | Source time unit identifier |
| groupSeparator | <code> </code> | Group separator used to join time groups in output duration string |

<a name="DurationTranslator"></a>

## DurationTranslator
**Kind**: global class  

* [DurationTranslator](#DurationTranslator)
    * [new DurationTranslator(timeIdentifiers)](#new_DurationTranslator_new)
    * [.translate(duration, sourceLocale, targetLocale)](#DurationTranslator+translate) ⇒ <code>string</code> \| <code>null</code>

<a name="new_DurationTranslator_new"></a>

### new DurationTranslator(timeIdentifiers)

| Param | Type |
| --- | --- |
| timeIdentifiers | [<code>TimeIdentifiers</code>](#TimeIdentifiers) \| <code>null</code> | 

<a name="DurationTranslator+translate"></a>

### durationTranslator.translate(duration, sourceLocale, targetLocale) ⇒ <code>string</code> \| <code>null</code>
Translate duration string from source to target locale

**Kind**: instance method of [<code>DurationTranslator</code>](#DurationTranslator)  

| Param | Description |
| --- | --- |
| duration | Input duration string |
| sourceLocale | Source locale name |
| targetLocale | Target locale name |

<a name="DurationValidator"></a>

## DurationValidator
Validate duration string without doing a conversion

**Kind**: global class  

* [DurationValidator](#DurationValidator)
    * [new DurationValidator(timeIdentifiers)](#new_DurationValidator_new)
    * [.validate(duration, locale)](#DurationValidator+validate) ⇒ <code>boolean</code>

<a name="new_DurationValidator_new"></a>

### new DurationValidator(timeIdentifiers)

| Param | Type | Default |
| --- | --- | --- |
| timeIdentifiers | [<code>TimeIdentifiers</code>](#TimeIdentifiers) \| <code>null</code> | <code></code> | 

<a name="DurationValidator+validate"></a>

### durationValidator.validate(duration, locale) ⇒ <code>boolean</code>
Validate if duration string meets all syntactic requirements

**Kind**: instance method of [<code>DurationValidator</code>](#DurationValidator)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| duration | <code>string</code> |  | Duration string expressed in human-like format |
| locale | <code>string</code> | <code>&quot;en&quot;</code> | Locale name which is used in duration string |

<a name="TimeConverter"></a>

## TimeConverter
Allow time conversion between units

**Kind**: global class  
<a name="TimeConverter+convert"></a>

### timeConverter.convert(time, sourceUnit, targetUnit) ⇒ <code>number</code>
Convert time number expressed in source unit to number expressed in target unit; both units are basic one (en)

**Kind**: instance method of [<code>TimeConverter</code>](#TimeConverter)  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>number</code> | Input time number |
| sourceUnit | <code>string</code> | Source time unit |
| targetUnit | <code>string</code> | Target time unit |

<a name="TimeGroups"></a>

## TimeGroups
Manage time groups and make some operations on them.

**Kind**: global class  

* [TimeGroups](#TimeGroups)
    * [new TimeGroups(timeIdentifiers)](#new_TimeGroups_new)
    * [.extractTimeGroups(duration, locale)](#TimeGroups+extractTimeGroups) ⇒ <code>Array.&lt;string&gt;</code>
    * [.parseTimeGroup(timeGroup, locale)](#TimeGroups+parseTimeGroup) ⇒ <code>Object</code> \| <code>null</code>
    * [.buildTimeGroup(parsedTime)](#TimeGroups+buildTimeGroup) ⇒ <code>string</code>
    * [.composeDuration(timeGroups, groupSeparator)](#TimeGroups+composeDuration) ⇒ <code>string</code>

<a name="new_TimeGroups_new"></a>

### new TimeGroups(timeIdentifiers)

| Param | Type | Default |
| --- | --- | --- |
| timeIdentifiers | [<code>TimeIdentifiers</code>](#TimeIdentifiers) \| <code>null</code> | <code></code> | 

<a name="TimeGroups+extractTimeGroups"></a>

### timeGroups.extractTimeGroups(duration, locale) ⇒ <code>Array.&lt;string&gt;</code>
Extract array of time groups which are in duration string

**Kind**: instance method of [<code>TimeGroups</code>](#TimeGroups)  

| Param | Type | Description |
| --- | --- | --- |
| duration | <code>string</code> | Whole duration string |
| locale | <code>string</code> | Locale name of time identifiers used in duration string |

<a name="TimeGroups+parseTimeGroup"></a>

### timeGroups.parseTimeGroup(timeGroup, locale) ⇒ <code>Object</code> \| <code>null</code>
Parse single time group to object having information about both unit and number of it

**Kind**: instance method of [<code>TimeGroups</code>](#TimeGroups)  

| Param | Type | Description |
| --- | --- | --- |
| timeGroup | <code>string</code> | Single time group |
| locale | <code>string</code> | Locale name of time unit used in time group |

<a name="TimeGroups+buildTimeGroup"></a>

### timeGroups.buildTimeGroup(parsedTime) ⇒ <code>string</code>
Build a single time group from object created while parsing a group

**Kind**: instance method of [<code>TimeGroups</code>](#TimeGroups)  

| Param | Type | Description |
| --- | --- | --- |
| parsedTime | <code>Object</code> | Object of parsed time group |

<a name="TimeGroups+composeDuration"></a>

### timeGroups.composeDuration(timeGroups, groupSeparator) ⇒ <code>string</code>
Compose the whole duration string from array of time groups; given separator is used to join all groups

**Kind**: instance method of [<code>TimeGroups</code>](#TimeGroups)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| timeGroups | <code>Array.&lt;string&gt;</code> |  | Array of time groups in the same locale as for output |
| groupSeparator | <code>string</code> | <code>&quot; &quot;</code> | Separator between every group in output duration string |

<a name="TimeIdentifiers"></a>

## TimeIdentifiers
Manage time identifiers used in duration string. This class allows to use time identifiers from many languages.

**Kind**: global class  

* [TimeIdentifiers](#TimeIdentifiers)
    * [.add(locale, newIdentifiers)](#TimeIdentifiers+add) ⇒ [<code>TimeIdentifiers</code>](#TimeIdentifiers)
    * [.get(locale)](#TimeIdentifiers+get) ⇒ <code>Object</code>
    * [.getInternalUnit(identifier, locale)](#TimeIdentifiers+getInternalUnit) ⇒ <code>string</code> \| <code>null</code>

<a name="TimeIdentifiers+add"></a>

### timeIdentifiers.add(locale, newIdentifiers) ⇒ [<code>TimeIdentifiers</code>](#TimeIdentifiers)
Register new time identifiers for the given locale

**Kind**: instance method of [<code>TimeIdentifiers</code>](#TimeIdentifiers)  

| Param | Type | Description |
| --- | --- | --- |
| locale | <code>string</code> | Name of locale for which time identifiers are registered |
| newIdentifiers |  | New time identifiers |

<a name="TimeIdentifiers+get"></a>

### timeIdentifiers.get(locale) ⇒ <code>Object</code>
Return time identifiers for the given locale name; if not registered, return identifiers for 'en' locale

**Kind**: instance method of [<code>TimeIdentifiers</code>](#TimeIdentifiers)  

| Param | Type | Description |
| --- | --- | --- |
| locale | <code>string</code> | Locale name |

<a name="TimeIdentifiers+getInternalUnit"></a>

### timeIdentifiers.getInternalUnit(identifier, locale) ⇒ <code>string</code> \| <code>null</code>
Return internal unit (en) for the time unit in the specified locale

**Kind**: instance method of [<code>TimeIdentifiers</code>](#TimeIdentifiers)  

| Param | Type | Description |
| --- | --- | --- |
| identifier | <code>string</code> | Localized time identifier |
| locale | <code>string</code> | Locale name |

