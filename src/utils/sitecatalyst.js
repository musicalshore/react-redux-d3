function trackCustom_scLV (val) {
  try {
    _scLV(val, 1, 'o')
    s.prop12 = s.prop13 = s.prop14 = s.events = s.eVar55 = s.eVar10 = ''
  } catch (e) {}
}

function trackCustom_tl (val) {
  try {
    s.linkTrackVars = 'eVar55,events'
    s.linkTrackEvents = 'event55'
    s.events = 'event55'
    s.eVar55 = val
    s.tl(this, 'o', val)
    s.events = s.eVar55 = s.eVar10 = s.prop10 = ''
  } catch (e) {}
}

function trackCustom_dl (val) {
  try {
    s.linkTrackVars = 'eVar7,events'
    s.linkTrackEvents = 'event4'
    s.events = 'event4'
    s.eVar7 = val
    s.tl(this, 'o', val)
    s.events = s.eVar7 = s.eVar10 = s.prop10 = ''
  } catch (e) {}
}

function kalturaPlayed (data, id) {
  try {
    var playerName = kdp.evaluate('{mediaProxy.entry.name}')
    s.linkTrackVars = 'eVar51,events'
    s.linkTrackEvents = 'event72'
    s.events = 'event72'
    s.eVar51 = playerName
    s.tl(this, 'o', playerName)
    s.events = s.eVar51 = s.eVar10 = s.prop10 = ''
    kalturaPlayed_Counter++
  } catch (e) {}
}

function kalturaPlayEnd (data, id) {
  try {
    var playerName = kdp.evaluate('{mediaProxy.entry.name}')
    s.linkTrackVars = 'eVar51,events'
    s.linkTrackEvents = 'event73'
    s.events = 'event73'
    s.eVar51 = playerName
    s.tl(this, 'o', playerName)
    s.events = s.eVar51 = s.eVar10 = s.prop10 = ''
  } catch (e) {}
}

export { trackCustom_scLV, trackCustom_tl, trackCustom_dl, kalturaPlayed, kalturaPlayEnd }
